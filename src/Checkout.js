import React from 'react'
import CheckoutProduct from './CheckoutProduct';
import './css/Checkout.css';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';

function Checkout() {
    const [{ basket, user }, dispatch] = useStateValue();
  return (
    <div className='checkout'>
        <div className='checkout__left'>
            <img className='checkout__ad'
                src="https://m.media-amazon.com/images/I/61gPd0h0boL._SX3000_.jpg"
                alt=""
            />
            <div>
                <h3>Hello, {user?.email}</h3>
               <h2 className='checkout__title'>Your Shopping Basket</h2> 
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
        <div className='checkout__right'>
            <Subtotal />
        </div>
    </div>
  )
}

export default Checkout
