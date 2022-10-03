import {useState} from 'react';
import {render, screen, fireEvent} from '@testing-library/react'
import renderer from 'react-test-renderer';
import {act} from 'react-dom/test-utils'
import App from '../App';
import SingIn from '../components/Signin'
import SingUp from '../components/Signup'


describe('Components Test', ()=> {
    it('Login Context Test', async () => {
         render(<SingUp/>)
        const signUpButton = document.querySelector('register-form')
        const signUp = render(<SingUp/>)

        console.log(signUpButton)
       
        
    }) 
})