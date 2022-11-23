import { configureStore } from "@reduxjs/toolkit";
import  postsSlice  from "../features/postsSlicer";
import  signInSlice  from "../features/signInSlicer";
import  signUpSlice  from "../features/signUpSlicer";


export const store = configureStore({
  reducer: {
    posts: postsSlice,
    singIn: signInSlice,
    signUp: signUpSlice,
    }
})