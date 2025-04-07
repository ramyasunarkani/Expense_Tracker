import React, { useRef } from 'react'
import styles from './ExpensesForm.module.css'
import axios from 'axios';

const ExpensesForm = ({ onAddExpense }) => {
  const descriptionRef=useRef(null);
  const amountRef=useRef(null);
  const categoryRef=useRef(null);

   const submitHandler=async (event)=>{
    event.preventDefault();
    const description=descriptionRef.current.value;
    const amount=amountRef.current.value;
    const category=categoryRef.current.value;
    const newExpense={
      description,
      amount,
      category

    }
   try{ 
    const res=await axios.post('https://expense-tracker-ef3e6-default-rtdb.firebaseio.com/expenses.json',{
      description,
      amount,
      category
      
      })
       onAddExpense({ id: res.data.name, ...newExpense });
    console.log(newExpense);
    descriptionRef.current.value='';
    amountRef.current.value='';
    categoryRef.current.value='';
  } catch(error){
    console.log(error)

  }


  }


  return (
    <div className={styles['form-container']}>
      <div className={styles['form-header']}>
        <h2>Add New Expense</h2>
      </div>
      <form onSubmit={submitHandler}>
        <select ref={categoryRef} className={styles["input-group"]} required>
          <option value=''>Select category</option>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Other">Other</option>
        </select>
        <input type="number" placeholder="Amount" ref={amountRef} className={styles["input-group"]} required/>
        <input type="text" placeholder="Enter description" ref={descriptionRef} className={styles["input-group"]}/>
        <button type="submit" className={styles['submit-btn']}>Add Expense</button>
      </form>
    </div>
  )
}

export default ExpensesForm
