import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  isLoading: false,
  productList: [],
};

export const fetchallfilteredproducts = createAsyncThunk(
  "/product/fetchallproducts",
  async () => {
    const result = await axios.get(
      "http://localhost:9001/api/shopping/products/get"
    );
    return result?.data;
  }
);

const ShoppingProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchallfilteredproducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchallfilteredproducts.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchallfilteredproducts.rejected, (state, action) => {
        console.error(action.error.message);
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default ShoppingProductSlice.reducer;
