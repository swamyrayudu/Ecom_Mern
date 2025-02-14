import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import AdminProductSlice from './adminslice/index'
import ShoppingProductSlice from './shopslice/productSlice/index'
import shoppingcartSlice from './shopslice/cartSlice/index'
import AddresSlice from './addressSlice/index'
import shoppingOrderSlice from './shopslice/orderSlice/index'
import AdminOrderSlice from './orderSliceAdmin/index'
import searchSlice from './shopslice/searchSlice/index'
import featureImage from './coomon/index'
const store = configureStore({
    reducer:{
        auth: authReducer,
        adminproduct: AdminProductSlice,
        shopproducts: ShoppingProductSlice,
        shoppingcart: shoppingcartSlice,
        shoppingAddress: AddresSlice,
        shoppingorder : shoppingOrderSlice,
        adminOrder: AdminOrderSlice,
        search : searchSlice,
        image : featureImage,
        
    }
})


export default store;