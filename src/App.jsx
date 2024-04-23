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

 // Contexts
 import DispatchContxt from './context/DispatchContxt'
 import StateContext from './context/StateContext'

function App() {

 

  const initialState= {
    userUserName: localStorage.getItem('The username'),
    userEmail: localStorage.getItem('The email'),
    userId: localStorage.getItem('The userId'),
    userToken: localStorage.getItem('The userToken'),
    userIsLogged: localStorage.getItem('The username') ? true : false,
   

    
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
          draft.userIsLogged = true
          break

        case 'logout':
          draft.userIsLogged = false
          break

 }
  }
  const [state,dispatch] = useImmerReducer(ReducerFunction,initialState)

  useEffect(() => {
    if(state.userIsLogged){
      localStorage.setItem('The username',state.userUserName)
      localStorage.setItem('The email',state.userEmail)
      localStorage.setItem('The userId',state.userId )
      localStorage.setItem('The userToken',state.userToken)
    }
    else{
      localStorage.removeItem('The username')
      localStorage.removeItem('The email')
      localStorage.removeItem('The userId')
      localStorage.removeItem('The userToken')
    }
   
  }, [state.userIsLogged])
  

  return (
    <>
    <StateContext.Provider value = {state}>
    <DispatchContxt.Provider value={dispatch}>
    <Router>
     <NavBar/>
     
     
     {/* Routes */}
     <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/testing" element={<Testing />} />

          <Route path="/test" element={<Test />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        <Footer/>
     </Router>

     </DispatchContxt.Provider>
     </StateContext.Provider>
    </>
  )
}

export default App
