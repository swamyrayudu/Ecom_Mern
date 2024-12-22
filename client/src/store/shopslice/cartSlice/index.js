import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cartItems: [],
    isLoading: false,
};

export const addcart = createAsyncThunk(
  "cart/addcart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post("http://localhost:9001/api/shopping/cart/add", {
      userId,
      productId,
      quantity,
    });
    return response.data;
}
);

export const fetchcartItems = createAsyncThunk(
  "cart/fetchcartItems",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:9001/api/shopping/cart/get/${userId}`
    );
    return response.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `http://localhost:9001/api/shopping/cart/${userId}/${productId}`
    );
    return response.data;
  }
);

export const updatCartItem = createAsyncThunk(
  "cart/updatCartItem",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      "http://localhost:9001/api/shopping/cart/update-cart",
      {
        userId,
        productId,
        quantity,
      }
    );
    console.log(quantity);
    return response.data;
  }
);
const shoppingcartSlice = createSlice({
  name: "shoppingcart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addcart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addcart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action?.payload.data;
        console.log(action?.payload);
      })
      .addCase(addcart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchcartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchcartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchcartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updatCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updatCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shoppingcartSlice.reducer;
