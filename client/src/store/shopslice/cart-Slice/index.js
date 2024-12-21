import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  isLoading: false,
};

const addcart = createAsyncThunk(
  "cart/addcart",
  async ({ userId, productId, quntity }) => {
    const result = axios.post("http://localhost:9001/api/shopping/add", {
      userId,
      productId,
      quntity,
    });
    return result.data;
  }
);

const fetchcartItems = createAsyncThunk(
  "cart/fetchcartItems",
  async (userId) => {
    const result = axios.get(
      `http://localhost:9001/api/shopping/get/${userId}`,
      {
        userId,
      }
    );
    return result.data;
  }
);

const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId, quntity }) => {
    const result = axios.delete(
      `http://localhost:9001/api/shopping/${userId}/${productId}`,
      {
        userId,
        productId,
      }
    );
    return result.data;
  }
);

const updatCartItem = createAsyncThunk(
  "cart/updatCartItem",
  async ({ userId, productId, quntity }) => {
    const result = axios.put("http://localhost:9001/api/shopping/update-cart", {
      userId,
      productId,
      quntity,
    });
    return result.data;
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
        state.cartItems = action.payload.data;
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

export default shoppingcartSlice.reducer
