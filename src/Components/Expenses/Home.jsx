import React, { useContext } from 'react'
import styles from './Home.module.css'
import { Link } from 'react-router-dom'
import AuthContext from '../../Store/auth-context'
const Home = () => {
  const authCtx=useContext(AuthContext);
  const token=authCtx.token;
  function emailVerifyHandler(){
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCN_BmXq84H6QLpnXwnpszsn_0UXAl7xwI',{
      method:'POST',
      body:JSON.stringify({"requestType":"VERIFY_EMAIL","idToken":token}),
      headers: { 'Content-Type': 'application/json' },
    }).then((res)=>{
      if(!res.ok){
        return res.json().then((data)=>{
          let errorMessage = 'Authentication failed!';
          if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        })
      }
      return res.json();
    }).then((data)=>{
          console.log('verification sent', data);

    }).catch((err) => {
            alert(`Error: ${err.message}`);
        });
  }
  return (

   <>
     <div className={styles["welcome-container"]}>
        <div className={styles["welcome-text"]}>welcome to expense tracker!!!</div>
        <p className={styles["incomplete-profile"]}> Your profile is incomplete. <Link to='/complete-profile'>Complete Now</Link></p>
        
    </div>
    <div className={styles["email-verify"]}>
        <button type='submit' onClick={emailVerifyHandler}>Verify Email</button>
    </div>
   </>
  )
}

export default Home