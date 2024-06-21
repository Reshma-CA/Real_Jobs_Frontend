import React , {useRef, useEffect,useState} from 'react'
import Avatar from './Avatar'
import SupportWindow from './Support_Window/Support_index'

const Chatbot_Engine = () => {
    const ref = useRef(null)
    const [visible,setVisible] = useState(false)

    useEffect(()=>{
        function handleClickOutside(event) {
            if (ref.current &&!ref.current.contains(event.target)) {
                setVisible(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return ()=>{
            document.removeEventListener("mousedown", handleClickOutside);
        }

    },[ref])
  return (
    <div ref={ref}>
        <SupportWindow
        visible={visible}/>
        <Avatar 
        onClick={() => setVisible(true)}
     style = {{position:'fixed',bottom:'50px',right:'150px'}}
    
    /></div>
  )
}

export default Chatbot_Engine