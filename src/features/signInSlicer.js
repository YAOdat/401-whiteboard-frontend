import {createSlice} from '@reduxjs/toolkit';

const signInSlice = createSlice({
    name: 'signIn',
    initialState: {
        signIn: false

    },
    reducers: {
        handleSignIn : (state, action) => {
                
                    state.signIn = action.payload;

        }
    }
});

export const {handleSignIn} = signInSlice.actions;

export default signInSlice.reducer;