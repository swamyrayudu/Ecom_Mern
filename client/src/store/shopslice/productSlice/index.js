import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null
};

export const fetchallfilteredproducts = createAsyncThunk(
  "/product/fetchallproducts",
  async ({filterparams,sortparams}) => {

    const query = new URLSearchParams({
      ...filterparams,
      sortBy : sortparams
    })
    const result = await axios.get(
      `http://localhost:9001/api/shopping/products/get?${query}`
    );
    return result?.data;
  }
);

export const fetchgetProductDeatails = createAsyncThunk(
  "/product/fetchproductDetails",
  async (id) => {

    const result = await axios.get(
      `http://localhost:9001/api/shopping/products/get/${id}`
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
        // console.log(action.payload);
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchallfilteredproducts.rejected, (state, action) => {
        console.error(action.error.message);
        state.isLoading = false;
        state.productList = [];
      }).addCase(fetchgetProductDeatails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchgetProductDeatails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchgetProductDeatails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export default ShoppingProductSlice.reducer;
