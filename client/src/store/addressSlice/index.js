import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  AddressList: [],
};

export const addNewAddress = createAsyncThunk(
  "/address/addnewaddress",
  async (formdata) => {
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shopping/address/add`,
      formdata
    );
    return result.data;
  }
);

export const fetchalladdress = createAsyncThunk(
  "/address/fetchalladdress",
  async (userId) => {
    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shopping/address/fetch/${userId}`
    );
    return result.data;
  }
);

export const updateaddress = createAsyncThunk(
  "/address/updateaddress",
  async ({userId, addressId, formdata}) => {
    const result = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/shopping/address/edit/${userId}/${addressId}`,
      formdata
    );
    return result.data;
  }
);

export const deleteaddress = createAsyncThunk(
  "/address/deleteaddress",
  async ({userId, addressId}) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/shopping/address/delete/${userId}/${addressId}`
    );
    return result.data;
  }
);

const AddresSlice = createSlice({
  name: "Address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.AddressList = action.payload.data;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
        state.AddressList = [];
      })
      .addCase(fetchalladdress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchalladdress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.AddressList = action.payload.data;
      })
      .addCase(fetchalladdress.rejected, (state) => {
        state.isLoading = false;
        state.AddressList = [];
      })
      // .addCase(deleteaddress.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(deleteaddress.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.AddressList = action.payload.data;
      // })
      // .addCase(deleteaddress.rejected, (state) => {
      //   state.isLoading = false;
      //   state.AddressList = [];
      // })
  },
});

export default AddresSlice.reducer;
