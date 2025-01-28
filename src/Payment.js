import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './css/Payment.css';
import { useStateValue } from './StateProvider';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketAmount } from './reducer.js';
import { useNavigate } from 'react-router-dom';
import axios from './axios';
import { db } from './firebase';
import { collection, setDoc, doc } from 'firebase/firestore';

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const stripe = useStripe();
    const elements = useElements();
    const [succeeded, setSucceeded]  = useState(false);
    const [processing, setProcessing]  = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled]  = useState(true);
    const [clientSecret, setClientSecret]  = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getClientSecret = async () => {
            const total = getBasketAmount(basket);
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${total}`
            });
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    }, [basket])

    //console.log('secret is', clientSecret);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then( async ({ paymentIntent }) => {
            const userDocRef = await doc(db, 'users', user?.uid); // Reference to the user document

            // Assuming paymentIntent.id is the ID of the payment intent
            const orderDocRef =  await doc(collection(userDocRef, 'orders'), paymentIntent.id); 
            const orderData = {
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            };
            await setDoc(orderDocRef, orderData);
            // db
            // .collection('users')
            // .doc(user?.uid)
            // .collection('orders')
            // .doc(paymentIntent.id)
            // .set({
            //     basket: basket,
            //     amount: paymentIntent.amount,
            //     created: paymentIntent.created
            // })

            setSucceeded(true);
            setProcessing(false);
            setError(null);
            dispatch({
                type: 'EMPTY_BASKET'
            })
            navigate('/orders');
        })
    }

    const handleChange = (event) => {
        setDisabled(event.empty);
        setError(event.error ?event.error.message: "");
    }

  return (
    <div className='payment'>
        <div className='payment__container'>
            <h1>
                Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
            </h1>
            {/* //address */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment__address'>
                    <p>{user?.email}</p>
                    <p>1215 E vista del cerro dr</p>
                    <p>Tempe, AZ</p>
                </div>
            </div>
            {/* Items */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review Items and Delivery</h3>
                </div>
                <div className='payment__items'>
                    {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                image={item.image}
                                rating={item.rating}
                            />
                    ))} 
                </div> 
            </div>
            {/* payment info */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Payment Method</h3>
                </div>
                <div className='payment__details'>
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange} />
                        <div className='payment__priceContainer'>
                            <CurrencyFormat
                                renderText={(value) => (
                                    <h3>Order total : {value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketAmount(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                            </button>
                        </div>
                        {error && <div>{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment
