import { createAsyncThunk,createSlice, freeze } from "@reduxjs/toolkit";
import axios from "axios";

let inititalState={
    allPost:[],
    loading: 'idle',
}

export const getAllPostData = createAsyncThunk(('allpost',async(body) =>{
    return axios.post("Api Url"+"End Url",body,{
        headers:{
            Accept:'application/json'
        },
    }).then((res)=>{
        return res.data;
    }).catch((err)=>{
        console.log("error to fetch Data ")
        return err;
    })
}))

const userPostSlice = createSlice({
    name:"userPost",
    inititalState,
    reducers:{
        ResetAllPost: state =>{
            state.allPost = [];
        },
    },
    extraReducers:builder =>{
        builder.addCase(getAllPostData.pending,state =>{
            // state.loading = "pending"
            // Show Loader 
        }),
        builder.addCase(getAllPostData.fulfilled,(state,action)=>{
            state.allPost = action.payload;
            // state.loading = "succeeded"
        }),
        builder.addCase(getAllPostData.rejected,state =>{
            // state.loading = "failed"
            // Hide Loader
        })
    }
})

export const {ResetAllPost}  = userPostSlice.actions;

export const usersPost = state => state.usersPost.allPost;
export default userPostSlice.reducer;