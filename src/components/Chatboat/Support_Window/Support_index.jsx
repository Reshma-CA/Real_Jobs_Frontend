import React ,{useState} from 'react'
import { Chatbot_Engine_styles } from '../Chatbot_Engine_styles';

import EmailForm from './EmailForm';
// import Chat_Engine from './Chat_Engine';

const SupportWindow = props => {
    const [user,setUser] = useState(null)
    const [chat,setChat] = useState(null)

  return (
    <div 

       
       style={{
        ...Chatbot_Engine_styles.supportWindow,
        ...{opacity: props.visible ? '1' : '0'}

    }}
    
    >
        <EmailForm
         
         setUser={(user => setUser(user))}
         setChat={(chat => setChat(chat))}
         visible={user === null || chat === null}
        />

     
    </div>
  )
}

export default SupportWindow