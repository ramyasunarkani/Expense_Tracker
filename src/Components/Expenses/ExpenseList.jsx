import React, {  useState } from 'react';
import axios from 'axios';
import styles from './ExpenseList.module.css';
import { BiEdit } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { useSelector,useDispatch } from 'react-redux';
import { expensesActions } from '../../Store/expenses';
const ExpenseList = ({fetchExpenses, onEditExpense }) => {
  const [expandedIndexes, setExpandedIndexes] = useState(new Set());
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const expenseList=useSelector(state=>state.expenses.items)
    const amount=useSelector(state=>state.expenses.totalAmount)
    const [showDropdown, setShowDropdown] = useState(false);

    const [premium,setPremium]=useState(localStorage.getItem('premium'));

 const dispatch=useDispatch()
  const deleteExpenseHandler = async (id) => {
  try {
    await axios.delete(
      `https://expense-tracker-ef3e6-default-rtdb.firebaseio.com/expenses/${userId}/${id}.json?auth=${token}`
    );
        
    dispatch(expensesActions.deleteExpense(id)); // ✅ update Redux instead of refetching

    console.log('Expense deleted successfully.');
  } catch (err) {
    console.error('Delete failed:', err);
  }
};
  const toggleDescription = (index) => {
    const updatedSet = new Set(expandedIndexes);
    updatedSet.has(index) ? updatedSet.delete(index) : updatedSet.add(index);
    setExpandedIndexes(updatedSet);
  };
  const activatePremium=()=>{
    localStorage.setItem('premium',true);
    setPremium(true);

  }
const downloadCSVHandler = () => {
  const headers = ['Category,Amount,Description'];
  const rows = expenseList.map(exp => 
    `${exp.category},${exp.amount},${exp.description}`
  );
  const csvContent = [headers, ...rows].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "expenses.csv");
  link.click();
};

  return (
    <div className={styles['list-container']}>
      <div className={styles['list-heading']}>
        <h2>Expense List</h2>
        {amount > 10000 && (
  <div className={styles.premiumTools}>
    <button
      onClick={() => {
        if (!premium) {
          activatePremium();
        } else {
          setShowDropdown(prev => !prev);
        }
      }}
      className={styles.premium}
    >
      {premium ? 'Premium Tools ⬇️' : 'Activate Premium'}
    </button>

    {premium && showDropdown && (
      <div className={styles.dropdown}>
        <button onClick={() => dispatch(themeActions.toggleTheme())}>
          Toggle Theme
        </button>
        <button onClick={downloadCSVHandler}>Download CSV</button>
      </div>
    )}
  </div>
)}


      </div>
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
