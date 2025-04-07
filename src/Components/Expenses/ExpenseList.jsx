import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ExpenseList.module.css';

const ExpenseList = ({expenseList}) => {
  const [expandedIndexes, setExpandedIndexes] = useState(new Set());

  
  const toggleDescription = (index) => {
    const updatedSet = new Set(expandedIndexes);
    if (updatedSet.has(index)) {
      updatedSet.delete(index);
    } else {
      updatedSet.add(index);
    }
    setExpandedIndexes(updatedSet);
  };

  return (
    <div className={styles['list-container']}>
      <h2>Expense List</h2>
      {expenseList.length === 0 && <p>No expenses found.</p>}
      {expenseList.map((expense, index) => (
        <div key={expense.id} className={styles['expense-item']}>
          <div
            className={styles['category']}
            onClick={() => toggleDescription(index)}
          >
            <strong>{expense.category}</strong> - ₹{expense.amount}
          </div>
          {expandedIndexes.has(index) && (
            <div className={styles['description']}>{expense.description}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
