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
    const [editingExpense, setEditingExpense] = useState(null);

    const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate(); 
  const authCtx=useContext(AuthContext);

  function logOutHandler() {
        authCtx.logout(); 
        console.log("Redirecting to login..."); 
        navigate('/');
    }
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



    useEffect(() => {
    
        fetchExpenses();
      }, []);
    

 const addOrUpdateExpenseHandler = (expense, isEdit = false) => {
    if (!isEdit) {
      setExpenseList((prev) => [expense, ...prev]);
    }
    fetchExpenses();
    setShowForm(false);
    setEditingExpense(null);
  };

  const startEditHandler = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };
  const handleAddNewClick = () => {
    setEditingExpense(null); // Set to null to show empty form
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
    
    <ExpenseList 
    expenseList={expenseList} 
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