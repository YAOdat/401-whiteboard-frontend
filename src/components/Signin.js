import axios from 'axios';
import React, {useEffect, useState, createContext} from 'react'
import base64 from 'base-64';
import { When } from 'react-if';
import  PostForm from './Add-post-form'
import SignUp from './Signup'
import cookies from 'react-cookies';
import  { OutButtonContext } from '../App';
import './homepage.css'

export const userAuth = createContext();


export default function SignIn() {

const [auth, setAuth] = useState(false)
const [wrongInputsMessage, setWrongInputsMessage] = useState(false)


    const handleSignIn = async (e) => {
        e.preventDefault();
        if(e.target.password.value === ''){
            setWrongInputsMessage(true)
            return 0;
        }
        console.log(e.target.password.value)
        const data = {
            'email': e.target.email.value,
            'password': e.target.password.value
        };

        
    const encodedCredintial = base64.encode(`${data.email}:${data.password}`);
     console.log(`Basic ${encodedCredintial}`)
    axios.post('http://localhost:3001/signin', {}, {
      headers: {
        Authorization: `Basic ${encodedCredintial}`
      }
    })
      .then(res => {
        console.log(res.data.id);
        cookies.save('userData', res.data)
        cookies.save('token', res.data.token);
        cookies.save('username', res.data.userName);
        cookies.save('userID', res.data.id);
        window.location.reload(false);


        setAuth(true)
      })
      .catch(err =>  {
        if(err.response.data == 'You are not authorized') {
            setWrongInputsMessage(true)
        } else {
            console.log(err.response.data);
        }
    })
  }


  const signOut =  () => {
    cookies.remove('token')
    cookies.remove('username')

    window.location.reload(false);
  }

    useEffect(()=> {
      const token = cookies.load('token')
      if(token) {
        setAuth(true)
      }
    }, [])

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