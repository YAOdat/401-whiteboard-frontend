import React, { useState, createContext, useContext} from 'react'
import { When } from 'react-if';
import  PostForm from './Add-post-form'
import SignUp from './Signup'
import  { OutButtonContext } from '../App';
import {authContext} from '../Context/AuthContext'
import './homepage.css'
import { useDispatch } from 'react-redux';
import { handleSignIn } from '../features/signInSlicer';

export const userAuth = createContext();

export default function SignIn() {

const {handleSignIn, auth, setAuth, signOut} = useContext(authContext)

const [wrongInputsMessage, setWrongInputsMessage] = useState(false)
const dispatch = useDispatch();



    return (
        <div>
          <When condition={!auth}>
            <div className='login-box'> 
         <header>Sign in to <span id='Pomment'> Pomment </span></header>
        <form onSubmit={handleSignIn} >
            <When condition={wrongInputsMessage}> 
            <p id='wrong-inputs-warning'> ⚠️ The password or the E-mail is incorrect! </p>
            </When>
        <input type='email' name='email' placeholder='Example@email.com' className='login-box-inputs'/> 
        <input type='password' name='password' className='login-box-inputs' placeholder='Password'/>
        <button id='login-button'> Login </button> 
        <p> Not registered? Register 👇</p>
        </form>
        </div>
            <br/>
            <SignUp/>
        </When>  

        <When condition={auth}>
        <button onClick={signOut} className='sign-out-button'> Sign Out </button>
        <PostForm />

        </When>  

        <OutButtonContext.Consumer>
          {
            (signOutButtonValue) => {
              if(signOutButtonValue.signOutButton === true) {
              signOut()
             
            }
          }}
        </OutButtonContext.Consumer>

        


        </div>

    )
}