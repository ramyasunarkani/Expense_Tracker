import React from 'react';
import styles from './Authentication.module.css';

const Authentication = () => {
  return (
    <section className={styles.auth}>
        <h2>SignUp</h2>
        <form>
        <div className={styles.control}>
            <input type="email" placeholder="Email" required />
        </div>
         <div className={styles.control}>
            <input type="password" placeholder="Password" required />
        </div>
         <div className={styles.control}>
          <input type="password" placeholder="Confirm Password" required />
        </div>
          <button type="submit">Sign up</button>
          <p>Have an account? <a href="#">Login</a></p>
        </form>
    </section>
  );
};

export default Authentication;
