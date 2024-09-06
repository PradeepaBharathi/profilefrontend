
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { toast } from "react-toastify";


const base_url ='https://profilebackend-z1c9.onrender.com'

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    console.log(credentials)
    try {
     
      const response = await axios.post(`${base_url}/user/login`, credentials);
      console.log(response)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem("user",JSON.stringify(response.data.data))
    

      toast.success(response.data.data.message)
      return response.data;
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data);
    }
  }
);


export const signupUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      console.log(userData)
      const response = await axios.post(`${base_url}/user/register`, userData);
      localStorage.setItem('token', response.data.token)
      localStorage.setItem("user",JSON.stringify(response.data.user))
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
    addUserStatus: 'idle', 
  },
    reducers:{
      resetAddUserStatus: (state) => {
        state.addUserStatus = 'idle'; 
    }
    },
  extraReducers: (builder) => {
    builder
     
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.addUserStatus='succeeded'
        toast.success("Login Successful")
        
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message || "Login failed!");
      })
      
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.addUserStatus='succeeded'
        toast.success("Signup successful!");
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message || "Signup failed!");
      });
  },
});

export default userSlice.reducer;
