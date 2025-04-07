import React, { useRef, useState } from 'react';
import axios from 'axios';
import styles from './ExpenseList.module.css';
import { BiEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';

const ExpenseList = ({ expenseList,fetchExpenses ,onEditExpense }) => {
  const [expandedIndexes, setExpandedIndexes] = useState(new Set());
   
  const deleteExpenseHandler = async (id) => {
    try {
      await axios.delete(
        `https://expense-tracker-ef3e6-default-rtdb.firebaseio.com/expenses/${id}.json`
      );
      alert('Expense deleted successfully.');
      fetchExpenses(); 
    } catch (err) {
      console.error('Delete failed:', err);
    }
  }; 
  
  const toggleDescription = (index) => {
    const updatedSet = new Set(expandedIndexes);
    updatedSet.has(index) ? updatedSet.delete(index) : updatedSet.add(index);
    setExpandedIndexes(updatedSet);
  };

  return (
    <div className={styles['list-container']}>
      <h2>Expense List</h2>
      {expenseList.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <ul className={styles['expense-list']}>
          {expenseList.map((expense, index) => (
            <li key={expense.id} className={styles['expense-item']}>
              <div
                className={styles['category']}
                onClick={() => toggleDescription(index)}
              >
                <strong>{expense.category}</strong> - ₹{expense.amount}
              </div>


              {expandedIndexes.has(index) && (
                <div className={styles['description']}>
                  {expense.description}
                </div>
              )}


              <div className={styles['action-icons']}>
                <BiEdit
                  className={styles.icon}
                  title="Edit"
                  onClick={() => onEditExpense(expense)}
                />

                <AiOutlineDelete
                  className={styles.icon}
                  title="Delete"
                  onClick={() => deleteExpenseHandler(expense.id)}
                />
              </div>

            </li>
          ))}
        </ul>
      )}

    </div>
  );
};

export default ExpenseList;
