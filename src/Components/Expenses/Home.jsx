import React, { useContext, useState } from 'react'
import styles from './Home.module.css'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../Store/auth-context'
import ExpensesForm from './ExpensesForm'
import { BiPlus } from 'react-icons/bi'

const Home = () => {
    const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate(); // ✅ useNavigate inside a valid component
  const authCtx=useContext(AuthContext);
  const token=authCtx.token;
  function logOutHandler() {
        authCtx.logout(); 
        console.log("Redirecting to login..."); 
        navigate('/');
    }
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
        <div>
          <p className={styles["incomplete-profile"]}> Your profile is incomplete.
           <Link to='/complete-profile'>Complete Now</Link>
           </p>
        <button className={styles["logout-btn"]} onClick={()=>logOutHandler()}>Logout</button>
        </div>
    </div>
    {/* <div className={styles["email-verify"]}>
        <button type='submit' onClick={emailVerifyHandler}>Verify Email</button>
    </div> */}
    {showForm && <ExpensesForm />}

      {/* ➕ Floating Button */}
      <div
        className={styles["floating-btn"]}
        onClick={() => setShowForm(!showForm)}
      >
        <BiPlus size={28} />
      </div>
   </>
  )
}

export default Home