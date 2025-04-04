import React, { useRef, useState } from 'react'
import styles from './ForgotPassword.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const ForgotPassword = () => {
  const navigate=useNavigate();
  const emailRef=useRef(null);
   const [message, setMessage] = useState(null);


  async function submitHandler(event){
    event.preventDefault();
    const enteredEmail=emailRef.current.value;
    if (!enteredEmail) {
      setMessage({ type: "error", text: "Please enter a valid email address!" });
      return;
    }
     const API_KEY = "AIzaSyCN_BmXq84H6QLpnXwnpszsn_0UXAl7xwI"; 

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`;
    try{
      const response=await axios.post(url,{
        requestType: "PASSWORD_RESET",
        email: enteredEmail,
      });
      setMessage({ type: "success", text: `Password reset email sent to: ${response.data.email}` });     
       emailRef.current.value='';

    }
    catch(error){
        const errorMsg = error.response?.data?.error?.message || "Failed to send password reset email.";
      setMessage({ type: "error", text: errorMsg });
    }
  }
  return (
    <div className={styles["forget-container"]}>
      <section className={styles.forget}>
        <div>
        <h1> Forgot Password</h1>
        <p>Oops... Looks like you forgot something!</p>
      </div>
      {message && (
          <p className={message.type === "success" ? styles.success : styles.error}>
            {message.text}
          </p>
        )}
      <form onSubmit={submitHandler}>
        <div className={styles["forget-control"]}>
         <label htmlFor='email'>Enter Your Email</label>
        <input type='email' id='email' placeholder='Enter your email' ref={emailRef} required/>
        </div>
        <button type='submit' className={styles["reset-btn"]}>Reset Password</button>
      </form>
      <h6>OR</h6>
      <button type='button' className={styles["login_back-btn"]} onClick={()=>navigate('/')}>Back Login</button>
      </section>

    </div>
  )
}

export default ForgotPassword