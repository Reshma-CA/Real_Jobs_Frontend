import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import Hero from './components/Hero.jsx';
// import Chatboat_Admin from './components/Chatboat/Chatboat_Admin.jsx';

// const path = window.location.pathname

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* {path.indexOf('/chatboat_admin') === -1 ? <Hero /> : <Chatboat_Admin />} */}
    <ToastContainer />
  </React.StrictMode>,
)
