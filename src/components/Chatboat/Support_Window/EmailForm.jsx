import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatBotIMG from '../../../assets/Chatbot/Chat_bot.jpg';

const EmailForm = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const qaPairs = {
    "hi": "How can I help you today",
    "What are your working hours?": "We are open Monday to Friday from 9 AM to 5 PM.",
    "How can I contact support?": "You can contact our support team via email at support@example.com or call us at (123) 456-7890.",
    "Where are you located?": "We are located at 123 Main Street, Anytown, USA.",
    "What services do you offer?": "We offer a variety of services including web development, mobile app development, and digital marketing.",
    "How can I schedule an appointment?": "You can schedule an appointment by calling us at (123) 456-7890 or booking online through our website.",
    "What is your refund policy?": "We offer a full refund within 30 days of purchase if you are not satisfied with our services.",
    "Do you offer technical support?": "Yes, we offer 24/7 technical support for all our products and services.",
    "Can I get a free consultation?": "Yes, we offer a free 30-minute consultation for new clients.",
    "How can I provide feedback?": "You can provide feedback by emailing us at feedback@example.com or filling out the feedback form on our website.",
    "What payment methods do you accept?": "We accept all major credit cards, PayPal, and bank transfers."
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessages = [...messages, { sender: 'user', text: input }];
      setMessages(newMessages);
      
      const response = qaPairs[input] || "Sorry, I don't understand that question.";
      setMessages([...newMessages, { sender: 'bot', text: response }]);
      setInput('');
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div style={{ backgroundColor: '#f0f0f0', height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '60px' }}>
      <div style={{
        width: '400px',
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        overflow: 'hidden',
        border: '2px solid #4a4a4a',
        display: 'flex',
        flexDirection: 'column',
        height: '73vh', // Set the height of the chat container
        position: 'relative', // Ensure positioning context for sticky image
      }}>
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          borderBottom: '1px solid #ccc',
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          zIndex: 1
        }}>
          <img 
            src="https://cdn.pixabay.com/photo/2023/03/05/21/11/ai-generated-7832244_1280.jpg" 
            alt="Chatbot" 
            style={{ 
              width: '50px', 
              height: '50px', 
              marginTop:'38px',
              marginBottom: '45px', // Adjusted marginBottom
              borderRadius: '50%',
              border: '1px solid purple',
              position: 'sticky',
              top: '250px', // Adjust position as needed
              zIndex: 2 // Ensure above chat messages
            }} 
          />
          <Typography style={{ color: '#8129a3', fontSize: '18px', fontWeight: 'bold', marginBottom: '1px' }}>
            Welcome to my Support👋
          </Typography>
        </div>
        <div className='MyApp' style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div className='wrapper' style={{ flex: 1, overflowY: 'auto', marginBottom: '10px', maxHeight: 'calc(73vh - 150px)' }}>
            {messages.map((message, index) => (
              <div key={index} style={{ textAlign: message.sender === 'bot' ? 'left' : 'right', marginBottom: '10px' }}>
                <p style={{
                  background: message.sender === 'bot' ? '#eee' : '#0084ff',
                  color: message.sender === 'bot' ? '#000' : '#fff',
                  borderRadius: '10px',
                  padding: '10px',
                  display: 'inline-block',
                  maxWidth: '80%'
                }}>
                  {message.text}
                </p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div style={{ display: 'flex' }}>
            <input
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                marginRight: '10px'
              }}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              startIcon={<SendIcon />}
              style={{ padding: '10px 20px', color: 'white', backgroundColor: '#7a39e0' }}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailForm;
