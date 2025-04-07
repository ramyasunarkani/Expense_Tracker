import React, { useContext, useEffect, useState } from 'react'
import styles from './Home.module.css'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../Store/auth-context'
import { BiPlus } from 'react-icons/bi'
import ExpensesForm from './ExpensesForm'
import ExpenseList from './ExpenseList'
import axios from 'axios'

const Home = () => {
    const [expenseList, setExpenseList] = useState([]);
  
    const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate(); // ✅ useNavigate inside a valid component
  const authCtx=useContext(AuthContext);
  const token=authCtx.token;
  function logOutHandler() {
        authCtx.logout(); 
        console.log("Redirecting to login..."); 
        navigate('/');
    }
    useEffect(() => {
        const fetchExpenses = async () => {
          try {
            const response = await axios.get(
              'https://expense-tracker-ef3e6-default-rtdb.firebaseio.com/expenses.json'
            );
    
            const data = response.data;
    
            const loadedExpenses = [];
    
            for (const key in data) {
              loadedExpenses.push({
                id: key,
                category: data[key].category,
                amount: data[key].amount,
                description: data[key].description
              });
            }
    
            setExpenseList(loadedExpenses);
          } catch (error) {
            console.error('Error fetching expenses:', error);
          }
        };
    
        fetchExpenses();
      }, []);
    
  // function emailVerifyHandler(){
  //   fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCN_BmXq84H6QLpnXwnpszsn_0UXAl7xwI',{
  //     method:'POST',
  //     body:JSON.stringify({"requestType":"VERIFY_EMAIL","idToken":token}),
  //     headers: { 'Content-Type': 'application/json' },
  //   }).then((res)=>{
  //     if(!res.ok){
  //       return res.json().then((data)=>{
  //         let errorMessage = 'Authentication failed!';
  //         if (data && data.error && data.error.message) {
  //             errorMessage = data.error.message;
  //         }
  //         throw new Error(errorMessage);
  //       })
  //     }
  //     return res.json();
  //   }).then((data)=>{
  //         console.log('verification sent', data);

  //   }).catch((err) => {
  //           alert(`Error: ${err.message}`);
  //       });
  // }

  const addExpenseHandler = (expense) => {
  setExpenseList((prev) => [expense, ...prev]);
};

  return (

   <div >
     <div className={styles["welcome-container"]} >
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
    <ExpenseList expenseList={expenseList}/>
    {showForm && (
  <div
    className={styles["overlay"]}
    onClick={() => setShowForm(false)}
  >
    <div onClick={(e) => e.stopPropagation()}>
      <ExpensesForm  onAddExpense={addExpenseHandler}/>
    </div>
  </div>
)}

      {!showForm&&(<div
        className={styles["floating-btn"]}
        onClick={() => { console.log("clicked"); setShowForm(true); }}

      >
        <BiPlus size={28} />
      </div>)}
   </div>
  )
}

export default Home