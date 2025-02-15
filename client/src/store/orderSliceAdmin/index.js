import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orderList: [],
  orderDetails: null,
};

export const getallordersAdmin = createAsyncThunk(
  "orders/getallordersAdmin",
  async () => {
    const response = await axios.get(
      "/api/admin/orders/alladminorders"
    );
    return response.data;
  }
);

export const getOrderDetailsAdmin = createAsyncThunk(
  "orders/getOrderDetailsAdmin",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/detailsadminorders/${id}`
    );
    return response.data;
  }
);

export const updataorederstatus = createAsyncThunk(
  "orders/updataorederstatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/orders/updateorderstatus/${id}`,
      {
        orderStatus,
      }
    );
    return response.data;
  }
);

const AdminOrderSlice = createSlice({
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
        state.isLoading = true;
        state.orderList = action.payload.data;
      })
      .addCase(getallordersAdmin.rejected, (state) => {
        state.isLoading = true;
        state.orderList = [];
      })
      .addCase(getOrderDetailsAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsAdmin.fulfilled, (state, action) => {
        state.isLoading = true;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsAdmin.rejected, (state) => {
        state.isLoading = true;
        state.orderDetails = [];
      });
  },
});
export const { restorderDetails } = AdminOrderSlice.actions;
export default AdminOrderSlice.reducer;
