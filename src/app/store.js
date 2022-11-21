import { configureStore } from "@reduxjs/toolkit";
import  postsSlice  from "../features/postsSlicer";

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    }
})