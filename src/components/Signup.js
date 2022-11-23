import React, {useState} from 'react';
import { When } from 'react-if';
import axios from 'axios';
import './homepage.css'
import { useDispatch } from 'react-redux';
import { handleSignUp } from '../features/signUpSlicer';

export default function SignUp() {

    const [registered, setRegistered] = useState(false)
    const dispatch = useDispatch();




    const handleSignUp = async (e) => {
        e.preventDefault();
        console.log(e.target.username.value)
        const data = {
            'userName': e.target.username.value,
            'email': e.target.email.value,
            'password': e.target.password.value

        };
        // https://odat-posts-database.herokuapp.com/
        // http://localhost:3001/signup
        await axios.post('https://odat-posts-database.herokuapp.com/signup', data).then(res => {
            console.log(res.statusText);
            if(res.statusText === 'Created') {
                setRegistered(true)
            }
          }).catch(e => console.log(e))
    }

    dispatch(handleSignUp)


    return (
        <div>
             <When condition={!registered}>

             <div className='login-box'>  
        <form onSubmit={handleSignUp}  id= 'register-form'>
        <input type='username' name='username' className='login-box-inputs' placeholder='Username'/> 
        <br/>
        <input type='email' name='email' className='login-box-inputs' placeholder='Example@email.com'/> 
        <br/>
        <input type='password' name='password' className='login-box-inputs' placeholder='Password'/>
        <button id='login-button'> Register! </button> 

        </form>
        </div>
        </When>

        <When condition={registered}>
        <div id='registered'>
        You registered sucessfully!
        <br/>
        Login, please!    
        </div>

        </When>

        </div>

    )
}