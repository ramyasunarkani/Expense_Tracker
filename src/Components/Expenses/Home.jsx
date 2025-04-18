import React, {  useEffect, useState } from 'react'
import styles from './Home.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { BiPlus } from 'react-icons/bi'
import ExpensesForm from './ExpensesForm'
import ExpenseList from './ExpenseList'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../Store/auth'
import { expensesActions } from '../../Store/expenses'

const Home = () => {
    const [editingExpense, setEditingExpense] = useState(null);
    const userId=useSelector((state)=>state.auth.userId);
    const token=useSelector((state)=>state.auth.token);
    const profile=useSelector(state=>state.profile.profileC);
      const [isVerified, setIsVerified] = useState(false)
      const [loading, setLoading] = useState(true);


    const dispatch=useDispatch();

    const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate(); 

  function logOutHandler() {
        dispatch(authActions.logout()) 
          setIsVerified(false); 
        console.log("Redirecting to login..."); 
        navigate('/');
    }
     const fetchExpenses = async () => {
          try {
            const response = await axios.get(
              `https://expense-tracker-ef3e6-default-rtdb.firebaseio.com/expenses/${userId}.json?auth=${token}`
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
            dispatch(expensesActions.setExpenses(loadedExpenses));
    
          } catch (error) {
            console.error('Error fetching expenses:', error);
          }
        };



    const checkEmailVerification = async () => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCN_BmXq84H6QLpnXwnpszsn_0UXAl7xwI`,
        {
          idToken: token,
        }
      )
      const isEmailVerified = response.data.users[0].emailVerified
      setIsVerified(isEmailVerified)
    } catch (error) {
      console.error('Error checking email verification:', error)
    }
  }

  useEffect(() => {
  const initialize = async () => {
    await checkEmailVerification();
    if (isVerified) {
      await fetchExpenses();
    }
    setLoading(false);
  };
  initialize();
}, [isVerified]);


 const addOrUpdateExpenseHandler = (expense, isEdit = false) => {
    if (!isEdit) {
      dispatch(expensesActions.addExpense(expense))
    }
    fetchExpenses();
    setShowForm(false);
    setEditingExpense(null);
  };

  const startEditHandler = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };
  

  

function emailVerifyHandler() {
  axios.post(
    'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCN_BmXq84H6QLpnXwnpszsn_0UXAl7xwI',
    {
      requestType: 'VERIFY_EMAIL',
      idToken: token,
    },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  )
  .then((res) => {
    console.log('Verification email sent:', res.data);
  })
  .catch((err) => {
    const errorMessage = err.response?.data?.error?.message || 'Authentication failed!';
    alert(`Error: ${errorMessage}`);
  });
}

  return (

   <div >
     <div className={styles["welcome-container"]} >
        <div className={styles["welcome-text"]}>welcome to expense tracker!!!</div>
        <div>
          {!profile?(<p className={styles["incomplete-profile"]}> 
          Your profile is incomplete.
           <Link to='/profile'>Complete Now</Link>
           </p>): <Link to='/profile'>Profile</Link>}

        <button className={styles["logout-btn"]} onClick={logOutHandler}>
          Logout
        </button>

        {!isVerified && (
          <button className={styles["verify-btn"]} type="button" onClick={emailVerifyHandler}>
            Verify Email
          </button>
        )}

        </div>
     </div>
    {loading ? (
  <p style={{ padding: '1rem', color: 'blue' }}>Loading...</p>
) : isVerified ? (
  <>
    <ExpenseList
      fetchExpenses={fetchExpenses}
      onEditExpense={startEditHandler}
    />
    {showForm && (
      <div className={styles['overlay']} onClick={() => setShowForm(false)}>
        <div onClick={(e) => e.stopPropagation()}>
          <ExpensesForm
            onAddExpense={addOrUpdateExpenseHandler}
            editingExpense={editingExpense}
          />
        </div>
      </div>
    )}
    {!showForm && (
      <div
        className={styles['floating-btn']}
        onClick={() => {
          setEditingExpense(null);
          setShowForm(true);
        }}
      >
        <BiPlus size={28} />
      </div>
    )}
  </>
) : (
  <p style={{ padding: '1rem', color: 'red' }}>
    Please verify your email to access your dashboard.
  </p>
)}

   </div>
  )
}

export default Home