import React, { useRef } from 'react'
import styles from './ForgotPassword.module.css'
const ForgotPassword = () => {
  const enteredEmail=useRef('');
  return (
    <div className={styles["forget-container"]}>
      <section className={styles.forget}>
        <div>
        <h1> Forgot Password</h1>
        <p>Oops... Looks like you forgot something!</p>
      </div>
      <form>
        <div className={styles["forget-control"]}>
         <label htmlFor='email'>Enter Your Email</label>
        <input type='email' id='email' placeholder='Enter your email'/>
        </div>
        <button type='submit'>Reset Password</button>
      </form>
      <h3>OR</h3>
      <button>Back Login</button>
      </section>

    </div>
  )
}

export default ForgotPassword