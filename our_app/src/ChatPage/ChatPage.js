import ChatSection from "../ChatSection/ChatSection";
import ChatUp from "../ChatUp/ChatUp";
import ContactList from "../ContactList/ContactList";
import { useState } from "react";


function ChatPage(props) {
    
    const [messages, setMessages] = useState([]);
    const [chatState, setchatState]= useState(-1);
    const [nameTop, setnameTop]= useState('');
    const [chatsUsers,setchatsUsers]= useState([]);
    const [partnerImage,setpartnerImage]=useState('');
    return (
        <div>
        <ChatUp inMyChat={props.inMyChat} myImage={props.myImage}/>
        <ChatSection users={chatsUsers} setUsers={setchatsUsers} info={props.info} chatMessages={messages} chatSetMessage={setMessages} chatState = {chatState} nameTop={nameTop} partnerImage={partnerImage} myImage={props.myImage} />
        <ContactList users={chatsUsers} setUsers={setchatsUsers} info={props.info} chatSetMessage={setMessages} setchatState={setchatState} chatState = {chatState} setnameTop={setnameTop} setpartnerImage={setpartnerImage}/>
        </div>
    );
  }
  export default ChatPage;
  