import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatBotIMG from '../../../assets/Chatbot/Chat_bot.jpg';

const EmailForm = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const [time, setTime] = useState(`${hours}:${minutes}:${seconds}`);
  const [dateTime, setDateTime] = useState(`${days[day]}, ${months[month]} ${year}`);
  const inputRef = useRef(null);
  const botMessageRef = useRef(null);
  const userMessageRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setTime(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    checkStatus();
  }, [dateTime]);

  const checkStatus = () => {
    const status = document.querySelector(".status");
    if (dateTime !== "Tuesday, June 18 2024") {
      status.innerHTML = "Active";
      status.style.color = "green";
    } else {
      status.innerHTML = "Not Active";
      status.style.color = "red";
    }
  };

  const handleInput = () => {
    const botMessage = botMessageRef.current;
    const userMessage = userMessageRef.current;
    const input = inputRef.current;

    if (!input.value) return;

    userMessage.innerHTML = input.value;

    const showMessage = (message) => {
      botMessage.innerHTML = "Typing...";
      setTimeout(() => {
        botMessage.innerHTML = message;
        input.value = '';
      }, 2000);
    };

    const responses = [
      { pattern: /fuck|bad|stupid|useless|bitch|crazy|nonsense/i, response: "Please do not use bad words" },
      { pattern: /hi|hello|hey|sup|yo|wassup|whats up|howdy|greetings|good morning|good afternoon|good evening/i, response: "Hello There, how are you doing today?" },
      { pattern: /bye|goodbye|see you later|cya|goodnight/i, response: "Bye, have a nice day" },
      { pattern: /thanks|thank you/i, response: "You are welcome" },
      { pattern: /how are you|how are you doing/i, response: "I am fine, thank you" },
      { pattern: /that's good|sounds nice|that sounds awesome|that sounds great|great|nice/i, response: "😁" },
      { pattern: /i'm fine|i am fine|i'm great|i'm good|great/i, response: "That is good" },
      { pattern: /what's your name|what is your name/i, response: "My name is Bot" },
      { pattern: /who is the owner|who made you|who is your maker|who is your owner/i, response: "The owner of this bot is Treasure" },
      { pattern: /who's treasure|who is treasure/i, response: "Treasure is a programmer based on ReactJS and NodeJS. He is the owner of a YouTube channel called Creative Tutorials" },
      { pattern: /what's your age|how old are you/i, response: "I am 1 year old" },
    ];

    const matchedResponse = responses.find(({ pattern }) => pattern.test(input.value));
    if (matchedResponse) {
      showMessage(matchedResponse.response);
    } else {
      showMessage("I don't understand that.");
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' ,marginBottom:'50px'}}>
      <div style={{
        width: '380px',
        backgroundColor: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        overflow: 'hidden',
        border: '2px solid #4a4a4a'
      }}>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <img 
            src="https://cdn.pixabay.com/photo/2023/03/05/21/11/ai-generated-7832244_1280.jpg" 
            alt="Chatbot" 
            style={{ 
              width: '50px', 
              height: '50px', 
              marginBottom: '10px',
              borderRadius: '50%',
              border: '1px solid purple' 
            }} 
          />
          <Typography style={{ color: '#8129a3', fontSize: '18px', fontWeight: 'bold' ,marginBottom:'1px'}}>
            Welcome to my Support👋
          </Typography>
        </div>
        <div className='MyApp' style={{  padding: '20px', borderRadius: '10px', height: '310px', display: 'flex', flexDirection: 'column' }}>
          <div className='wrapper' style={{ flex: 1, overflowY: 'auto', marginBottom: '10px' }}>
            <div className="content">
              <div className="header" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <div className="img" style={{ marginRight: '10px' }}>
                  <img src={ChatBotIMG} alt="Chatbot" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                </div>
                <div className="right" style={{ flex: 1 }}>
                  <div className="name" style={{ fontWeight: 'bold', color: '#4a4a4a' }}>ChatBot</div>
                  <div className="status">Active</div>
                </div>
              </div>
              <div className="main" style={{ flex: 1 }}>
                <div className="main_content" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div className="messages">
                    <div className="bot-message" ref={botMessageRef} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '10px', backgroundColor: '#f9f9f9' }}></div><br/>
                    <div className="human-message" ref={userMessageRef} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '10px', backgroundColor: '#e1f5fe' }}></div>
                  </div>
                </div>
              </div>
              <div className="bottom" style={{ marginTop: '10px' }}>
                <div className="btm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                  <div className="input" style={{ width: '100%' }}>
                    <input type="text" id="input" ref={inputRef} placeholder='Enter your message' style={{ width: '94%',height:'30px', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} />
                  </div>
                  <div className="btn" style={{ width: '100%' }}>
                    <Button variant="contained" color="primary" onClick={handleInput} startIcon={<SendIcon />} style={{ width: '100%', padding: '8px', color: 'white' ,backgroundColor: '#7a39e0'}}>Send</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailForm;
