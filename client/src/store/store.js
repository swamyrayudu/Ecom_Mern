import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import AdminProductSlice from './adminslice/index'
import ShoppingProductSlice from './shopslice/productSlice/index'
import shoppingcartSlice from './shopslice/cartSlice/index'
import AddresSlice from './addressSlice/index'
import shoppingOrderSlice from './shopslice/orderSlice/index'
import AdminOrderSlice from './orderSliceAdmin/index'
const store = configureStore({
    reducer:{
        auth: authReducer,
        adminproduct: AdminProductSlice,
        shopproducts: ShoppingProductSlice,
        shoppingcart: shoppingcartSlice,
        shoppingAddress: AddresSlice,
        shoppingorder : shoppingOrderSlice,
        adminOrder: AdminOrderSlice
    }
})


export default store;