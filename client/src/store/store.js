import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import AdminProductSlice from './adminslice/index'
import ShoppingProductSlice from './shopslice/productSlice/index'
import shoppingcartSlice from './shopslice/cartSlice/index'
import AddresSlice from './addressSlice/index'
import shoppingOrderSlice from './shopslice/orderSlice/index'
const store = configureStore({
    reducer:{
        auth: authReducer,
        adminproduct: AdminProductSlice,
        shopproducts: ShoppingProductSlice,
        shoppingcart: shoppingcartSlice,
        shoppingAddress: AddresSlice,
        shoppingorder : shoppingOrderSlice
    }
})


export default store;