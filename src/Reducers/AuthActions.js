import axios from 'axios';
import cookies from "react-cookies";


export const handleSignIn = (dispatch, payload) => {
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

