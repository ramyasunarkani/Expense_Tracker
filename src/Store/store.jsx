import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth'
import expensesReducer from './expenses'
import themeReducer from './theme'; 
import profileReducer from './profile';
 const store=configureStore({
    reducer:{auth:authReducer,
      expenses:expensesReducer,
      theme:themeReducer,
      profile:profileReducer
   }
 })

 export default store;