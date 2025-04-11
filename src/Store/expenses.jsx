import { createSlice } from '@reduxjs/toolkit';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    items: [],
    totalAmount: 0
  },
  reducers: {
    setExpenses(state, action) {
      state.items = action.payload;
      state.totalAmount = action.payload.reduce(
        (total, expense) => total + Number(expense.amount),
        0
      );
    },
    addExpense(state, action) {
      state.items.unshift(action.payload);
      state.totalAmount += Number(action.payload.amount);
    },
    deleteExpense(state, action) {
  const id = action.payload;
  const existingIndex = state.items.findIndex((item) => item.id === id);
  if (existingIndex !== -1) {
    state.totalAmount -= Number(state.items[existingIndex].amount);
    state.items.splice(existingIndex, 1);
  }
}

  }
});

export const expensesActions = expensesSlice.actions;
export default expensesSlice.reducer;
