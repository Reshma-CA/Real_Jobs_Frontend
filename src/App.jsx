import { useEffect, useState } from 'react'
import NavBar from './layouts/NavBar'
import {BrowserRouter as Router ,Route,Routes} from 'react-router-dom'
import './App.css'
import { useImmerReducer } from 'use-immer'
import Hero from './components/Hero'
import Footer from './layouts/Footer'
import Listings from './components/Listings'
import Home from './components/Home'
import Test from './components/Test'
import Register from './components/Register'
import Login from './components/Login'
import Testing from './components/Testing'
import AddProperty from './components/AddProperty'
// Google
import { GoogleOAuthProvider } from '@react-oauth/google';

 // Contexts
 import DispatchContxt from './context/DispatchContxt'
 import StateContext from './context/StateContext'
 import googleuserContext from './context/googleuserContext'

function App() {

  //starting of  Google Auth

  const clientId = "647214474363-tald3t4u32m20fgnaijibpvv9n08sgbr.apps.googleusercontent.com"

  // const[userInfo,setUserInfo]=useState([])

  // const VerifyToken =()=>{
  //   const access_key = localStorage.getItem("access_token");
  //   const username = localStorage.getItem("username");
  //   const email = localStorage.getItem("email");
  //   const id = localStorage.getItem("id");

  //   fetch("http://127.0.0.1:8000/listing/token/verify/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ token: access_key }),
  //   }).then((response) => {
  //     if (response.ok) {
  //       setUserInfo({
  //         ...userInfo,
  //         access_token: access_key,
  //         username: username,
  //         email:email,
  //         id:id,
  //       });
  //     } else {
  //       setUserInfo({ ...userInfo, access_token: null, username: null ,email:null,id:null});
  //     }
  //   });
  // }

 
 
  // useEffect(() => {
  //   VerifyToken();
  // }, []);

  // End of Google verification

  const initialState= {
    userUserName: localStorage.getItem('The username'),
    userEmail: localStorage.getItem('The email'),
    userId: localStorage.getItem('The userId'),
    userToken: localStorage.getItem('The userToken'),
    GoogleToken: localStorage.getItem('The GoogleToken'), // Add GoogleToken here
    // userIsLogged: localStorage.getItem('The username') ? true : false,
    userIsLogged: localStorage.getItem('The username') || localStorage.getItem('The GoogleToken') ? true : false,
   

    
}

function ReducerFunction(draft,action){
    switch (action.type) {
        case 'catchToken':
          draft.userToken = action.tokenValue
          break

        case 'userSignIn':
          draft.userUserName = action.usernameInfo
          draft.userEmail = action.emailInfo
          draft.userId = action.IdInfo
          draft.GoogleToken = action.GoogleTokenInfo
          draft.userIsLogged = true
          break

        case 'logout':
          draft.userIsLogged = false
          break

        case 'googleLogout':
          draft.GoogleToken = null;
          break;

 }
  }
  const [state,dispatch] = useImmerReducer(ReducerFunction,initialState)

  useEffect(() => {
    if(state.userIsLogged){
      localStorage.setItem('The username',state.userUserName)
      localStorage.setItem('The email',state.userEmail)
      localStorage.setItem('The userId',state.userId )
      localStorage.setItem('The userToken',state.userToken)
      localStorage.setItem('The GoogleToken',state.GoogleToken)
    }
    else{
      localStorage.removeItem('The username')
      localStorage.removeItem('The email')
      localStorage.removeItem('The userId')
      localStorage.removeItem('The userToken')
      localStorage.removeItem('The GoogleToken')
    }
   
  }, [state.userIsLogged])
  


  return (
    <>
    <StateContext.Provider value = {state}>
    <DispatchContxt.Provider value={dispatch}>
      {/* <googleuserContext.Provider value={userInfo}> */}
    <Router>
    <GoogleOAuthProvider clientId = {clientId}>
     <NavBar/>
     
     
     {/* Routes */}
     <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addproperty" element={<AddProperty />} />
          <Route path="/testing" element={<Testing />} />

          <Route path="/test" element={<Test />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        <Footer/>
        </GoogleOAuthProvider>
     </Router>
     {/* </googleuserContext.Provider> */}
     </DispatchContxt.Provider>
     </StateContext.Provider>
    </>
  )
}

export default App
