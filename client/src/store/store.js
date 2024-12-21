import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import AdminProductSlice from './adminslice/index'
import ShoppingProductSlice from './shopslice/productSlice/index'
import shoppingcartSlice from './shopslice/cart-Slice/index'

const store = configureStore({
    reducer:{
        auth: authReducer,
        adminproduct: AdminProductSlice,
        shopproducts: ShoppingProductSlice,
        cartItems: shoppingcartSlice
    }
})


export default store;