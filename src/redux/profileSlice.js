import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const base_url = 'https://profilebackend-z1c9.onrender.com/';


const getToken = () => {
  return localStorage.getItem('token'); 
};




export const fetchProfile = createAsyncThunk(
    "profile/:id",
    async(formData,{rejectWithValue})=>{
        console.log(formData)
        try {
            const token = getToken();
            if (!token) {
              throw new Error("No token found");
            }
            console.log(token)
            const storedUser = localStorage.getItem("user");
            const user = JSON.parse(storedUser);
            const userId = user._id
            console.log(userId)
            const response = await axios.get(`${base_url}/profile/profile/${userId}`, {
                headers: {
                  'x-auth-token': token 
                }
              });
              console.log(response.data.user);
              return response.data.user
        } catch (error) {
      return rejectWithValue(error.response.data);
            
        }
    }
)

export const editProfile = createAsyncThunk(
    "editProfile",
    async (formData, { rejectWithValue }) => {
      try {
        const token = getToken();
        console.log(token)
        if (!token) {
          throw new Error("No token found");
        }
        const storedUser = localStorage.getItem("user");
const user = JSON.parse(storedUser);
        const userId = user._id; 
        const response = await axios.put(
          `${base_url}/profile/editprofile/${userId}`,
          formData, 
          {
            headers: {
              'x-auth-token': token,
              'Content-Type': 'application/json', 
            },
          }
        );
        console.log(response.data);
        return response.data.user; 
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );
const profileSlice = createSlice({
    name:"profiles",
    initialState:{
        loading:false,
        profile:[],
  
        error:null,
      fetchProfileStatus: 'idle', 
        
    },
    reducers: {
       resetFetchProfileStatus:(state)=>{
        state.fetchProfileStatus='idle'
       }
    },
    extraReducers:(builder)=>{
        builder

        .addCase(fetchProfile.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(fetchProfile.fulfilled,(state,action)=>{
            state.loading= false;
            state.profile = action.payload
            state.fetchProfileStatus='succeeded'
            toast.success("Profile details fetched")

        })
        .addCase(fetchProfile.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;  
        toast.error(action.payload.message || "Unable to Edit!");

        })
        .addCase(editProfile.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(editProfile.fulfilled,(state,action)=>{
            state.loading= false;
            state.profile = action.payload
            state.fetchProfileStatus='succeeded'
            toast.success("Profile Edited")
        })
        .addCase(editProfile.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;  
        toast.error(action.payload.message || "Unable to Edit!");

        })
    }
})

export default profileSlice.reducer