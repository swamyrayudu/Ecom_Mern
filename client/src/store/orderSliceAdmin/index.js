import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderList: [],
  orderDetails: null,
};

export const getallordersAdmin = createAsyncThunk(
  "adminOrder/getallordersAdmin",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/alladminorders`
    );
    return response.data;
  }
);

export const getOrderDetailsAdmin = createAsyncThunk(
  "adminOrder/getOrderDetailsAdmin",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/detailsadminorders/${id}`
    );
    return response.data;
  }
);

export const updataorederstatus = createAsyncThunk(
  "adminOrder/updataorederstatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/updateorderstatus/${id}`,
      { orderStatus }
    );
    return response.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {
    restorderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getallordersAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallordersAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getallordersAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetailsAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { restorderDetails } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
