import React, { useRef } from 'react';
import styles from './Authentication.module.css';

const SignUp = ({ onSwitch }) => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const conpassRef = useRef(null);

    const submitHandler = (event) => {
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmpassword = conpassRef.current.value;

        if (password !== confirmpassword) {
            alert('Passwords do not match!');
            return;
        }

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCN_BmXq84H6QLpnXwnpszsn_0UXAl7xwI', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => {
            if (!res.ok) {
                return res.json().then((data) => {
                    let errorMessage = 'Authentication failed!';
                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message;
                    }
                    throw new Error(errorMessage);
                });
            }
            return res.json();
        })
        .then((data) => {
            console.log('User signed up:', data);
            alert('Signup successful!');
            emailRef.current.value = '';
            passwordRef.current.value = '';
            conpassRef.current.value = '';
        })
        .catch((err) => {
            alert(`Error: ${err.message}`);
        });
    };

    return (
        <section>
            <h2>Sign Up</h2>
            <form onSubmit={submitHandler} className={styles.auth}>
                <div className={styles.control}>
                    <input type="email" placeholder="Email" required ref={emailRef} />
                </div>
                <div className={styles.control}>
                    <input type="password" placeholder="Password" required ref={passwordRef} />
                </div>
                <div className={styles.control}>
                    <input type="password" placeholder="Confirm Password" required ref={conpassRef} />
                </div>
                <button type="submit" className={styles.sign}>Sign Up</button>
            </form>
            <button className={styles.toggle} onClick={onSwitch}>Have an account? Login</button>
        </section>
    );
};

export default SignUp;
