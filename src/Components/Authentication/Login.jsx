import React, { useContext, useRef, useState } from 'react';
import styles from './Authentication.module.css';
import { Link, useNavigate } from 'react-router-dom'; // ✅ Import Link
import AuthContext from '../../Store/auth-context';

const Login = ({ onSwitch }) => {
    const [showPass, setShowPass] = useState(false);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const authCntx = useContext(AuthContext);
    const navigate=useNavigate();

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
            
            authCntx.login(data.idToken);
            navigate('/home');
            emailRef.current.value = '';
            passwordRef.current.value = '';
        })
        .catch((err) => alert(`Error: ${err.message}`));
    }

    return (
        <div className={styles['auth-container']}>
            <section>
            <h2 className={styles.heading}>Login</h2>
            <form onSubmit={submitHandler} className={styles.auth}>
                <div className={styles.control}>
                    <input type="email" placeholder="Email" required ref={emailRef} />
                </div>
                <div className={styles.control} style={{ position: 'relative' }}>
                    <input 
                        type={showPass ? "text" : "password"} 
                        placeholder="Password" 
                        required 
                        ref={passwordRef} 
                        className={styles.passwordInput}
                    />
                    <span 
                        className={styles.showPassIcon} 
                        onClick={() => setShowPass((prev) => !prev)}
                    >
                        {showPass ? "🙈" : "👁️"}
                    </span>
                </div>
                <button type="submit" className={styles.sign}>Login</button>
                <Link to="/forgot-password" className={styles.forgotPassword}>Forgot Password?</Link>
            </form>
            <button className={styles.toggle} onClick={onSwitch}>Don't have an account? Sign Up</button>
        </section>
        </div>
    );
};

export default Login;
