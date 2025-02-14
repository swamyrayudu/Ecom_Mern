import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    featureImage: [],
};

export const getfeatureimage = createAsyncThunk(
    "/feature/getimage",
    async () => {
        const response = await axios.get(
            'http://localhost:9001/api/commen/feature/getfeature' // Ensure this URL matches your server configuration
        );

        return response.data;
    }
);

export const addfetureimage = createAsyncThunk(
    "/feature/addfetureimage",
    async (image) => {
        const response = await axios.post(
            'http://localhost:9001/api/commen/feature/addfeature', { image });

        return response.data;
    }
);

export const deleteFeatureImage = createAsyncThunk(
    "feature/deleteFeatureImage",
    async (id) => {
        const response = await axios.delete(
            `http://localhost:9001/api/commen/feature/deletefeature/${id}`
        );
        return response.data;
    }
);

const FeatureimageSlice = createSlice({
    name: "FeatureimageSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getfeatureimage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getfeatureimage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.featureImage = action.payload.data;
            })
            .addCase(getfeatureimage.rejected, (state) => {
                state.isLoading = false;
                state.featureImage = [];
            })
            .addCase(deleteFeatureImage.fulfilled, (state, action) => {
                state.featureImage = state.featureImage.filter(
                    (image) => image._id !== action.meta.arg
                );
            });
    },
});

export default FeatureimageSlice.reducer;