import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const AddProduct = createAsyncThunk(
  "/product/addnewpost",
  async (formdata) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/add`,
      formdata,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const fetchallproducts = createAsyncThunk(
  "/product/fetchproducts",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/products/get`
    );
    return result?.data;
  }
);

export const Editproduct = createAsyncThunk(
  "/product/editproduct",
  async ({ id, formdata }) => {
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`,
      formdata,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const deleteproduct = createAsyncThunk(
  "/product/deleteproduct",
  async (id) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`
    );
    return result?.data;
  }
);

const AdminProductSlice = createSlice({
  name: "adminProduts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchallproducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchallproducts.fulfilled, (state, action) => {

        (state.isLoading = true), (state.productList = action.payload.data);
      })
      .addCase(fetchallproducts.rejected, (state, action) => {
        (state.isLoading = true), (state.productList = []);
      });
  },
});

export default AdminProductSlice.reducer;
