
// // Chat_Engine.js
// import React, { useState, useEffect } from 'react';
// import { Chatbot_Engine_styles } from '../Chatbot_Engine_styles';
// import { Box, Typography, TextField, Button } from '@mui/material';
// import axios from 'axios';

// const Chat_Engine = ({ visible, chat, user }) => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     // Fetch initial messages or setup WebSocket connection here
//     if (user && chat) {
//       fetchMessages(); // Example function to fetch messages
//     }
//   }, [user, chat]);

//   const fetchMessages = () => {
//     // Replace with actual API call to fetch messages
//     axios.get(`llhttps://your-backend-api/messages/${chat.id}`)
//       .then(response => {
//         setMessages(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching messages:', error);
//       });
//   };

//   const sendMessage = () => {
//     // Replace with actual API call to send message
//     axios.post(`cffhttps://your-backend-api/messages/${chat.id}`, {
//       sender: user.username,
//       text: message,
//       timestamp: new Date().toISOString()
//     })
//       .then(response => {
//         const newMessage = response.data;
//         setMessages([...messages, newMessage]);
//         setMessage('');
//       })
//       .catch(error => {
//         console.error('Error sending message:', error);
//       });
//   };

//   return (
//     <div style={{ ...Chatbot_Engine_styles.chatEngineWindow, display: visible ? 'block' : 'none' }}>
//       <div style={{ height: '0px' }}>
//         <div style={Chatbot_Engine_styles.stripe} />
//       </div>

//       <Box style={{ marginTop: '20px' }}>
//         <Typography style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
//           Welcome {user ? user.username : ''} to the Chat
//         </Typography>
//       </Box>

//       <div style={{ height: '400px', overflowY: 'scroll' }}>
//         {messages.map((msg, index) => (
//           <div key={index} style={{ marginBottom: '10px', padding: '5px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
//             <Typography variant="body1" style={{ fontSize: '16px' }}>
//               {msg.text}
//             </Typography>
//             <Typography variant="caption" style={{ fontSize: '12px', color: '#888888' }}>
//               {msg.sender} • {new Date(msg.timestamp).toLocaleTimeString()}
//             </Typography>
//           </div>
//         ))}
//       </div>

//       <Box style={{ marginTop: '20px', width: '100%' }}>
//         <TextField
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           variant="outlined"
//           fullWidth
//           placeholder="Type your message here..."
//           InputProps={{ style: { color: '#7a39e0', borderRadius: '20px' } }}
//           style={{ backgroundColor: 'white', borderRadius: '20px', marginBottom: '10px' }}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={sendMessage}
//           style={{ backgroundColor: '#7a39e0',borderRadius: '20px', padding: '10px 20px' ,width: '100px', }}
//         > 
//           Send
//         </Button>
//       </Box>
//     </div>
//   );
// };

// export default Chat_Engine;

