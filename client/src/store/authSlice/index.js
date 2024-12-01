import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    isAuthenticated: false, 
    isLoading: true,
    user : null
}

export const registerAction = createAsyncThunk('/auth/register',
    async(formdata)=>{
        const response =await axios.post('http://localhost:9001/api/auth/register',formdata,{
            withCredentials:true
        })
        return response.data
    }
   
)

export const loginAction = createAsyncThunk('/auth/login',
    async(formdata)=>{
        const response =await axios.post('http://localhost:9001/api/auth/login',formdata,{
            withCredentials:true
        })
        return response.data
    }
   
)

export const Logoutuser = createAsyncThunk('/auth/logout',
    async()=>{
        const response =await axios.post('http://localhost:9001/api/auth/logout',{},{
            withCredentials:true
        })
        return response.data
    }
   
)

export const checkAction = createAsyncThunk('/auth/checkauth',
    async()=>{
        const response =await axios.get('http://localhost:9001/api/auth/check-auth',{
            withCredentials:true,
            headers:{
                'Cache-Control':"no-store,no-cache, must-revalidate, proxy-revalidate"
            }
        })
        return response.data
    }
   
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(registerAction.pending,(state)=>{
            state.isLoading = true
        }).addCase(registerAction.fulfilled,(state,action)=>{
            state.isLoading = false
            state.user = null;
            state.isAuthenticated = false
        }).addCase(registerAction.rejected,(state,action)=>{
            state.isLoading = false
            state.user = null;
            state.isAuthenticated = false
        })
        .addCase(loginAction.pending,(state)=>{
            state.isLoading = true
        }).addCase(loginAction.fulfilled,(state,action)=>{
            console.log(action);
            state.isLoading = false
            state.user = action.payload.success ? action.payload.user:null;
            state.isAuthenticated = action.payload.success
        }).addCase(loginAction.rejected,(state,action)=>{
            state.isLoading = false
            state.user = null;
            state.isAuthenticated = false
        })
        .addCase(checkAction.pending,(state)=>{
            state.isLoading = true
        }).addCase(checkAction.fulfilled,(state,action)=>{
            state.isLoading = false
            state.user = action.payload.success ? action.payload.user:null;
            state.isAuthenticated = action.payload.success
        }).addCase(checkAction.rejected,(state)=>{
            state.isLoading = false
            state.user = null;
            state.isAuthenticated = false
        })
        .addCase(Logoutuser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
    }
})

export const {setUser} = authSlice.actions;
export default authSlice.reducer;