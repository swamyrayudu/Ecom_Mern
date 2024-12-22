import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import AdminProductSlice from './adminslice/index'
import ShoppingProductSlice from './shopslice/productSlice/index'
import shoppingcartSlice from './shopslice/cartSlice/index'

const store = configureStore({
    reducer:{
        auth: authReducer,
        adminproduct: AdminProductSlice,
        shopproducts: ShoppingProductSlice,
        shoppingcart: shoppingcartSlice,
    }
})


export default store;