import React, { useContext, useRef } from 'react';
import styles from './Authentication.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../Store/auth';
import axios from 'axios';

const SignUp = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const conpassRef = useRef(null);
    const navigate=useNavigate();
    const dispatch=useDispatch();

   const submitHandler = (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmpassword = conpassRef.current.value;

    if (password !== confirmpassword) {
        alert('Passwords do not match!');
        return;
    }

    axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCN_BmXq84H6QLpnXwnpszsn_0UXAl7xwI',
        {
            email: email,
            password: password,
            returnSecureToken: true
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    .then((res) => {
        alert("Account created successfully! Please log in.");
    navigate('/login');;

        emailRef.current.value = '';
        passwordRef.current.value = '';
        conpassRef.current.value = '';
    })
    .catch((err) => {
        const errorMessage = err.response?.data?.error?.message || 'Something went wrong!';
        alert(`Error: ${errorMessage}`);
    });
};


    return (
        <div className={styles['auth-container']}>
            <section className={styles.section}>
            <h2 className={styles.heading}>Sign Up</h2>
            <form onSubmit={submitHandler} >
                <div className={styles.control}>
                   <label htmlFor='email'>Email</label>
                    <input type="email" id='email' placeholder="Email" required ref={emailRef} />
                </div>
                <div className={styles.control}>
                <label htmlFor='pass'>Password</label>
                    <input type="password" id='pass' placeholder="Password" required ref={passwordRef} />
                </div>
                <div className={styles.control}>
                    <label htmlFor='cpass'>Confirm Password</label>
                    <input type="password" id='cpass' placeholder="Confirm Password" required ref={conpassRef} />
                </div>
                <button type="submit" className={styles.sign}>Sign Up</button>
            </form>
            <button className={styles.toggle} onClick={()=>{
             navigate('/login');
             }}>Have an account? Login</button>
        </section>
        </div>
    );
};

export default SignUp;
