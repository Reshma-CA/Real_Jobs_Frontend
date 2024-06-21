import React ,{useState} from 'react'
import { Chatbot_Engine_styles } from './Chatbot_Engine_styles'
import './Chatbot_Engine.css' 

const Avatar = (props) => {
    const [hovered, setHovered] = useState(false);
  
    return (
      <div style={props.style}>
        <div
          style={{
            ...Chatbot_Engine_styles.avatarHello,
            opacity: hovered ? '1' : '0',
          }}
        >
          Hey, Ask me !!! 🙋‍♂ 
        </div>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => props.onClick && props.onClick()}
          style={{
            ...Chatbot_Engine_styles.chatWithMeButton,
            border: hovered ? '1px solid #f9f0ff' : '4px solid #7a39e0',
          }}
        />
      </div>
    );
  };
  
  export default Avatar;