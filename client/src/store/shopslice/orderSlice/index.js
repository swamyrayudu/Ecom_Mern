import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  approvalURL: null,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderdata) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shopping/order/create`,
      orderdata
    );
    return response.data;
  }
);

export const captureOrder = createAsyncThunk(
  "order/captureOrder",
  async ({ orderId, paymentId, payerId }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shopping/order/capture`,
      {
        orderId,
        paymentId,
        payerId,
      }
    );
    return response.data;
  }
);

export const getallorders = createAsyncThunk(
  "order/getallorders",
  async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shopping/order/all/${userId}`
    );
    return response.data;
  }
);

export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shopping/order/details/${id}`
    );
    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrder",
  initialState,
  reducers: {
    restorderDetails: (state) => {    
      state.orderDetails = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })
      .addCase(getallorders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallorders.fulfilled, (state, action) => {
        state.isLoading = true;
        state.orderList = action.payload.data;
      })
      .addCase(getallorders.rejected, (state) => {
        state.isLoading = true;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = true;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = true;
        state.orderDetails = [];
      });
  },
});
export const { restorderDetails } = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
