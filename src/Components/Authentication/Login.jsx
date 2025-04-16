import React, { useContext, useRef, useState } from 'react';
import styles from './Authentication.module.css'
import { Link, useNavigate } from 'react-router-dom'; 
import { authActions } from '../../Store/auth';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const dispatch=useDispatch();
    const navigate=useNavigate();

     async function submitHandler(event) {
        event.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

         try {
            const response = await axios.post(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCN_BmXq84H6QLpnXwnpszsn_0UXAl7xwI',
                {
                    email,
                    password,
                    returnSecureToken: true
                },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            const data = response.data;

            dispatch(authActions.login({
            token: data.idToken,
            userId: data.localId
            }));
            console.log({
            token: data.idToken,
            userId: data.localId
            })
            navigate('/home');

            emailRef.current.value = '';
            passwordRef.current.value = '';
        } catch (error) {
            alert(`Error: ${error.response?.data?.error?.message || 'Login failed'}`);
        }
    }    

    return (
        <div className={styles['auth-container']}>
            <section className={styles.section}>
            <h1 className={styles.heading}>Login</h1>
            <form onSubmit={submitHandler} >
                <div className={styles.control}>
                <label htmlFor='email'>Email</label>
                    <input type="email" id='email' placeholder="Email" required ref={emailRef} />
                </div>
                <div className={styles.control} style={{ position: 'relative' }}>
                  <label htmlFor='pass'>Password</label>
                    <input 
                        type={showPass ? "text" : "password"} 
                        placeholder="Password" 
                        id='pass'
                        required 
                        ref={passwordRef} 
                        className={styles.passwordInput}
                    />
                     <span
                        className={styles.showPassIcon}
                        onClick={() => setShowPass((prev) => !prev)}
                      >
                            {showPass ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <button type="submit" className={styles.sign}>Login</button>
                <Link to="/forgot-password" className={styles.forgotPassword}>Forgot Password?</Link>
            </form>
            <button className={styles.toggle} 
            onClick={()=>{    
            navigate('/signUp');
            }}>New to Sharpener ? Register Now</button>
        </section>
        </div>
    );
};

export default Login;
