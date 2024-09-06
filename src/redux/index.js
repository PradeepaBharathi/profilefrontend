import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import profileReducer from './profileSlice'

const store = configureStore({
    reducer:{
        user:userReducer,
        profiles:profileReducer
        
        
    }
})

export default store