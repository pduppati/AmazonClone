import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged }  from 'firebase/auth'
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders';

const promise = loadStripe("pk_test_51OhhdkFcnxzVGrg2XeB90YjWgIuFQ6BdHRNMT7UlW8q0k8dGJedEoD334pfxc2rFGbrN2DjCQtnLOEchL89Uu9cl008zZ2uFzs");

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if(authUser) {
        console.log(authUser);
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
      else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<><Header /> <Home /></>} />
          <Route path='/login' element={< Login/>} />
          <Route path="/checkout" element={<><Header /><Checkout /></>} />
          <Route path='/payment' element={<><Header /> <Elements stripe={promise}> <Payment /> </Elements> </>} />
          <Route path='/orders' element={<><Header /> <Orders/> </>} />
          <Route path="*" element={<><Header /> <Home /></>} />
        </Routes>  
      </div>
    </Router>
  );
}

export default App;
