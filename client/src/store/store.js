import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import AdminProductSlice from './adminslice/index'

const store = configureStore({
    reducer:{
        auth: authReducer,
        adminproduct: AdminProductSlice
    }
})


export default store;