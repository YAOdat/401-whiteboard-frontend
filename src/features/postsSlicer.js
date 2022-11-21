import {createSlice} from '@reduxjs/toolkit';

 export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
    },
    reducers: {
        getPosts : (state, action) => {
            // get posts from the server
            state.posts = action.payload
            
            console.log(action)
            state.posts = action.payload
        }

    }
});

export const {getPosts} = postsSlice.actions;
export default postsSlice.reducer;