
import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DispatchContxt from '../context/DispatchContxt';
import StateContext from '../context/StateContext';

const GoogleAuth = () => {
  const navigate = useNavigate();
  const GlobalDispatch = useContext(DispatchContxt);
  const GlobalState = useContext(StateContext);

  const handleSuccess = async (codeResponse) => {
    const authorizationCode = codeResponse.code;
    try {
      const response = await axios.post('http://127.0.0.1:8000/listing/google/', {
        code: authorizationCode,
      });
      if (response.status === 200) {
        const { access_token, username, email ,id} = response.data;
        console.log(response.data)
       
        GlobalDispatch({
          type: 'userSignIn', 
          usernameInfo: username,
          emailInfo: email,
          GoogleTokenInfo:access_token,
          IdInfo: id, // You may adjust this based on your backend response
        });
        navigate('/');
      } else {
        console.error('Google authentication failed.');
      }
    } catch (error) {
      console.error('Error exchanging authorization code:', error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    flow: 'auth-code',
  });

  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      onClick={login}
      style={{ margin: '8px 0', backgroundColor: '#4285F4' }}
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google Logo"
        style={{ marginRight: '8px', height: '24px' }}
      />
      Sign in with Google
    </Button>
  );
};

export default GoogleAuth;


// import React from 'react';
// import { Button } from '@mui/material';
// import { useGoogleLogin } from '@react-oauth/google';
// import { useNavigate } from 'react-router-dom';

// import DispatchContxt from '../context/DispatchContxt';
// import StateContext from '../context/StateContext';
// import { useContext } from 'react';
// import {useImmerReducer} from 'use-immer';

// const btstyle = {
//   margin: '8px 0',
//   height: '35px',
//   width: '100%',
// };

// const GoogleAuth = () => {
//   const navigate = useNavigate();

//   const GlobalDispatch = useContext(DispatchContxt)
//   const GlobalState = useContext(StateContext)


// const [state,dispatch] = useImmerReducer(ReducerFunction,initialState)

//   const handleSuccess = (codeResponse) => {
//     const authorizationCode = codeResponse.code;

//     fetch("http://127.0.0.1:8000/listing/google/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ code: authorizationCode }),
//     })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('Failed to authenticate with Google.');
//       }
//       return response.json();
//     })
    
//     .catch((error) => {
//       console.error("Error exchanging authorization code:", error);
//     });
//   };

//   const login = useGoogleLogin({
//     onSuccess: handleSuccess,
//     flow: "auth-code",
//   });

//   return (
//     <Button
//       variant="contained"
//       color="primary"
//       fullWidth
//       onClick={login}
//       style={{ ...btstyle, backgroundColor: '#4285F4' }}
//     >
//       <img
//         src="https://developers.google.com/identity/images/g-logo.png"
//         alt="Google Logo"
//         style={{ marginRight: '8px', height: '24px' }}
//       />
//       Sign in with Google
//     </Button>
//   );
// };

// export default GoogleAuth;
