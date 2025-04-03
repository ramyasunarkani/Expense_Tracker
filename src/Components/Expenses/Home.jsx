import React from 'react'
import styles from './Home.module.css'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className={styles["welcome-container"]}>
        <div className={styles["welcome-text"]}>welcome to expense tracker!!!</div>
        <p className={styles["incomplete-profile"]}> Your profile is incomplete. <Link to='/complete-profile'>Complete Now</Link></p>
        
    </div>
  )
}

export default Home