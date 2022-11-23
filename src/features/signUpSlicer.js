import {createSlice} from '@reduxjs/toolkit';

const signUpSlice = createSlice({
    name: 'signUp',
    initialState: {
        signUp: false 

    },
    reducers: {
        handleSignUp : (state, action) => {

                state.signUp = action.payload;


            
            }
    }
});

export const {handleSignUp} = signUpSlice.actions;

export default signUpSlice.reducer;