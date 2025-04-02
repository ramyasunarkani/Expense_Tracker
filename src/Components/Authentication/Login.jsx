import React, { useRef } from 'react';
import styles from './Authentication.module.css';
import { Link } from 'react-router-dom'; // ✅ Import Link


const Login = ({ onSwitch }) => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    function submitHandler(event) {
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCN_BmXq84H6QLpnXwnpszsn_0UXAl7xwI', {
            method: 'POST',
            body: JSON.stringify({ email, password, returnSecureToken: true }),
            headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => res.ok ? res.json() : res.json().then(data => { throw new Error(data.error.message); }))
        .then((data) => {
            console.log('User logged in:', data);
            alert('Login successful!');
            emailRef.current.value = '';
            passwordRef.current.value = '';
        })
        .catch((err) => alert(`Error: ${err.message}`));
    }
     

    return (
        <section >
            <h2>Login</h2>
            <form onSubmit={submitHandler} className={styles.auth}>
                <div className={styles.control}>
                    <input type="email" placeholder="Email" required ref={emailRef} />
                </div>
                <div className={styles.control}>
                    <input type="password" placeholder="Password" required ref={passwordRef} />
                </div>
                <button type="submit" className={styles.sign}>Login</button>
                <Link to="/forgot-password" className={styles.forgotPassword}>Forgot Password?</Link>
            </form>
            <button className={styles.toggle} onClick={onSwitch}>Don't have an account? Sign Up</button>

        </section>
    );
};

export default Login;
