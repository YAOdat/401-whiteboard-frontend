import axios from "axios"
import { createContext, useState, useEffect} from "react";
import base64 from 'base-64';
import cookies from 'react-cookies';

export const authContext = createContext();

const AuthContextProvider = (props) => { 

const [auth, setAuth] = useState(false);
const [role, setRole] = useState('');
const [capabilities, setCapabilities] = useState();
const [wrongInputsMessage, setWrongInputsMessage] = useState(false)

const handleSignIn = async (e) => {
    e.preventDefault();
    if(e.target.password.value === ''){
        setWrongInputsMessage(true)
        return 0;
    }
    const data = {
        'email': e.target.email.value,
        'password': e.target.password.value
    };

    
const encodedCredintial = base64.encode(`${data.email}:${data.password}`);
 console.log(`Basic ${encodedCredintial}`)
axios.post('https://odat-posts-database.herokuapp.com/signin', {}, {
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

const value = {handleSignIn, auth, setAuth, signOut, role, setRole, capabilities, setCapabilities };

return(

<authContext.Provider value = {value}> 

{props.children}

</authContext.Provider>

)

}


export default AuthContextProvider