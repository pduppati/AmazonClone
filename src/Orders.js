import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import './css/Orders.css';
import { useStateValue } from './StateProvider';
import { collection, doc, orderBy, onSnapshot } from "firebase/firestore";
import Order from './Order';

function Orders() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        if(user) {
            const userDocRef = doc(db, 'users', user?.uid); // Reference to the user document

            // Reference to the orders collection under the user's document, ordered by 'created' field in descending order
            const ordersCollectionRef = collection(userDocRef, 'orders');
           // const orderedOrdersQuery = await orderBy(ordersCollectionRef, 'created', 'desc');

            // Subscribe to changes in the ordered orders collection
            const unsubscribe = onSnapshot(ordersCollectionRef, snapshot => {
                const ordersData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }));
                setOrders(ordersData);
            });
        } else {
            setOrders([])
        }
    },[])
  return (
    <div className='orders'>
        <h1>Your Orders</h1>

        <div className='orders__order'>
            {orders?.map(order => (
                <Order order={order} />
            ))}
        </div>
    </div>
  )
}

export default Orders
