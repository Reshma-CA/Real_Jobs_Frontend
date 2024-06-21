// import React, { useState, useRef, useEffect } from 'react';
// import ChatBotIMG from '../../assets/Chatbot/Chat_bot.jpg';
// import { Button } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
// import './Chatboat.css';

// const Test = () => {
//   const date = new Date();
//   const hours = date.getHours();
//   const minutes = date.getMinutes();
//   const seconds = date.getSeconds();
//   const day = date.getDay();
//   const month = date.getMonth();
//   const year = date.getFullYear();
//   const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//   const [time, setTime] = useState(`${hours}:${minutes}:${seconds}`);
//   const [dateTime, setDateTime] = useState(`${days[day]}, ${months[month]} ${year}`);

//   const inputRef = useRef(null);
//   const botMessageRef = useRef(null);
//   const userMessageRef = useRef(null);

//   useEffect(() => {
//     checkStatus();
//   }, [dateTime]);

//   const checkStatus = () => {
//     let isActive = dateTime !== "Tuesday, June 18 2024";
//     const status = document.querySelector(".status");

//     if (isActive) {
//       status.innerHTML = "Active";
//       status.style.color = "green";
//     } else {
//       status.innerHTML = "Not Active";
//       status.style.color = "red";
//     }
//   };

//   const handleInput = () => {
//     const botMessage = botMessageRef.current;
//     const userMessage = userMessageRef.current;
//     const input = inputRef.current;

//     if (!input.value) return;

//     userMessage.innerHTML = input.value; // display the input value and append it to the message2 id

//     const showMessage = (message) => {
//       botMessage.innerHTML = "Typing...";
//       setTimeout(() => {
//         botMessage.innerHTML = message;
//         input.value = ''; // clear the input
//       }, 2000);
//     };

//     const responses = [
//       { pattern: /fuck|bad|stupid|useless|bitch|crazy|nonsense/i, response: "Please do not use bad words" },
//       { pattern: /hi|hello|hey|sup|yo|wassup|whats up|howdy|greetings|good morning|good afternoon|good evening/i, response: "Hello There, how are you doing today?" },
//       { pattern: /bye|goodbye|see you later|cya|goodnight/i, response: "Bye, have a nice day" },
//       { pattern: /thanks|thank you/i, response: "You are welcome" },
//       { pattern: /how are you|how are you doing/i, response: "I am fine, thank you" },
//       { pattern: /that's good|sounds nice|that sounds awesome|that sounds great|great|nice/i, response: "😁" },
//       { pattern: /i'm fine|i am fine|i'm great|i'm good|great/i, response: "That is good" },
//       { pattern: /what's your name|what is your name/i, response: "My name is Bot" },
//       { pattern: /who is the owner|who made you|who is your maker|who is your owner/i, response: "The owner of this bot is Treasure" },
//       { pattern: /who's treasure|who is treasure/i, response: "Treasure is a programmer based on ReactJS and NodeJS. He is the owner of a YouTube channel called Creative Tutorials" },
//       { pattern: /what's your age|how old are you/i, response: "I am 1 year old" },
//     ];

//     // Log the user input and matched response
//     console.log("User Input:", input.value);

//     // Find the first matching response
//     const matchedResponse = responses.find(({ pattern }) => pattern.test(input.value));
//     if (matchedResponse) {
//       console.log("Matched Response:", matchedResponse.response);
//       showMessage(matchedResponse.response);
//     } else {
//       console.log("No match found, sending default response.");
//       showMessage("I don't understand that.");
//     }
//   };

//   return (
//     <div className='MyApp'>
//       <div className='wrapper'>
//         <div className="content">
//           <div className="header">
//             <div className="img">
//               <img src={ChatBotIMG} alt="Chatbot" />
//             </div>
//             <div className="right">
//               <div className="name">ChatBot</div>
//               <div className="status">Active</div>
//             </div>
//           </div>
//           <div className="main">
//             <div className="main_content">
//               <div className="messages">
//                 <div className="bot-message" ref={botMessageRef}></div>
//                 <div className="human-message" ref={userMessageRef}></div>
//               </div>
//             </div>
//           </div>
//           <div className="bottom">
//             <div className="btm">
//               <div className="input">
//                 <input type="text" id="input" ref={inputRef} placeholder='Enter your message' />
//               </div>
//               <div className="btn">
//                 <Button onClick={handleInput} startIcon={<SendIcon />}>Send</Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Test;
