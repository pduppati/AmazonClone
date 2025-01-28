import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './css/Login.css';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signIn = async (e) => {
        e.preventDefault();
        try {
            const log = await signInWithEmailAndPassword(auth, email, password);
            console.log(log);
            if(log) {
                navigate('/');
            }
        }
        catch(error) {
            alert(error.message)
        }
    }

    const register = async (e) => {
        e.preventDefault();
        try {
            const reg = await createUserWithEmailAndPassword(auth, email, password);
            console.log(reg);
            if(reg) {
                navigate('/');
            }
        }
        catch(error) {
            alert(error.message)
        }
    }

  return (
    <div className='login'>
        <Link to="/">
            <img
                className='login__logo'
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1206px-Amazon_logo.svg.png"
                alt=""
            />
        </Link>
        <div className='login__container'>
            <h1>Sign-In</h1>
            <form>
                <h5>Email</h5>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                <h5>Password</h5>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button className='login_signInButton' type="submit" onClick={signIn}>SignIn</button>
            </form>
            <p>
                By signing in you agree to the project Condition's of Use & Sale.
                Please see our Privacy Notice, our Cookie's Notice and our interest based Ad notice.
            </p>
            <button className='login_registerButton' onClick={register}>Create your Amazon account</button>
        </div>
    </div>
  )
}

export default Login
