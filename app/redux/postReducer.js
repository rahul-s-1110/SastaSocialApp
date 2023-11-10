import { createSlice } from '@reduxjs/toolkit'

export const postSlice = createSlice({
    name: 'posts',
    initialState:{
      post:[],
    },
    reducers: {
      addPost: (state,action) => {
        state.post.push(action.payload);
      },
      likePost: (state,action) =>{
        let post = state.post.find((item)=> item?.postId == action.payload);
        if(post){
            post.like = !post.like;
            if(post.like){
                post.numOfLike += 1;
            }else{
                post.numOfLike -= 1;
            }
        }
      }
    },
  })
  
  export const { addPost,likePost} = postSlice.actions;
  export default postSlice.reducer;
  