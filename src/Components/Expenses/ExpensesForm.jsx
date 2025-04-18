import React, { useEffect, useRef } from 'react';
import styles from './ExpensesForm.module.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ExpensesForm = ({ onAddExpense, editingExpense }) => {
  const descriptionRef = useRef(null);
  const amountRef = useRef(null);
  const categoryRef = useRef(null);
  const token=useSelector(state=>state.auth.token);
  const userId=useSelector(state=>state.auth.userId);

  useEffect(() => {
    if (editingExpense) {
      descriptionRef.current.value = editingExpense.description;
      amountRef.current.value = editingExpense.amount;
      categoryRef.current.value = editingExpense.category;
    } else {
      descriptionRef.current.value = '';
      amountRef.current.value = '';
      categoryRef.current.value = '';
    }
  }, [editingExpense]);

  const submitHandler = async (event) => {
    event.preventDefault();

    const description = descriptionRef.current.value;
    const amount = amountRef.current.value;
    const category = categoryRef.current.value;

    const newExpense = {
      description,
      amount,
      category,
    };

    try {
      if (editingExpense) {
        await axios.put(
          `https://expense-tracker-ef3e6-default-rtdb.firebaseio.com/expenses/${userId}/${editingExpense.id}.json?auth=${token}`,
          newExpense
        );



        onAddExpense({ id: editingExpense.id, ...newExpense }, true); 
        console.log('Expense updated successfully');
      } else {
        const res = await axios.post(
        `https://expense-tracker-ef3e6-default-rtdb.firebaseio.com/expenses/${userId}.json?auth=${token}`,
        newExpense
      );


        const newExpenseWithId = { id: res.data.name, ...newExpense };
        onAddExpense(newExpenseWithId); 
        console.log('Expense added successfully');
      }

      descriptionRef.current.value = '';
      amountRef.current.value = '';
      categoryRef.current.value = '';
    } catch (error) {
      console.error('Error saving expense:', error);
    }
  };

  return (
    <div className={styles['form-container']}>
      <div className={styles['form-header']}>
        <h2>{editingExpense ? 'Edit Expense' : 'Add New Expense'}</h2>
      </div>
      <form onSubmit={submitHandler}>
        <select ref={categoryRef} className={styles['input-group']} required>
          <option value="">Select category</option>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          ref={amountRef}
          className={styles['input-group']}
          required
        />
        <input
          type="text"
          placeholder="Enter description"
          ref={descriptionRef}
          className={styles['input-group']}
        />
        <button type="submit" className={styles['submit-btn']}>
          {editingExpense ? 'Update Expense' : 'Add Expense'}
        </button>
      </form>
    </div>
  );
};

export default ExpensesForm;
