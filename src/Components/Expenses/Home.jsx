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
    const dispatch=useDispatch();

    const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate(); 

  function logOutHandler() {
        dispatch(authActions.logout()) 
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



    useEffect(() => {
    
        fetchExpenses();
      }, []);
    

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
  
  return (

   <div >
     <div className={styles["welcome-container"]} >
        <div className={styles["welcome-text"]}>welcome to expense tracker!!!</div>
        <div>
          <p className={styles["incomplete-profile"]}> Your profile is incomplete.
           <Link to='/complete-profile'>Complete Now</Link>
           </p>
        <button className={styles["logout-btn"]}
         onClick={()=>logOutHandler()}>
        Logout</button>
        </div>
    </div>
    
    <ExpenseList 
    fetchExpenses={fetchExpenses}
    onEditExpense={startEditHandler}
    />
    {showForm && (
  <div
    className={styles["overlay"]}
    onClick={() => setShowForm(false)}
  >
    <div onClick={(e) => e.stopPropagation()}>
      <ExpensesForm  
       onAddExpense={addOrUpdateExpenseHandler}
       editingExpense={editingExpense}
              />
    </div>
  </div>
)}

      {!showForm&&(<div
        className={styles["floating-btn"]}
        onClick={() => {
           console.log("clicked"); 
           setEditingExpense(null);
            setShowForm(true);
          }}

      >
        <BiPlus size={28} />
      </div>)}
   </div>
  )
}

export default Home