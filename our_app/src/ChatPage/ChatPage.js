import ChatSection from "../ChatSection/ChatSection";
import ChatUp from "../ChatUp/ChatUp";
import ContactList from "../ContactList/ContactList";
import { useState } from "react";


function ChatPage(props) {
    
    const [messages, setMessages] = useState([]);
    const [chatState, setchatState]= useState(-1);
    const [nameTop, setnameTop]= useState(''); //delete later
    const [partnerImage,setpartnerImage]=useState(''); //delete later
    const [otherUser, setOtherUser] = useState('');
    const [time, setTime] = useState('');


    return (
        <div>
        <ChatUp profilePic={props.profilePic} password={props.password} username={props.username} inMyChat={props.inMyChat} myImage={props.myImage}/>
        <ChatSection time={time} setTime={setTime} otherUser={otherUser} password={props.password} username={props.username} profilePic={props.profilePic} chatsUsers={props.chatsUsers} setchatsUsers={props.setchatsUsers} info={props.info} chatMessages={messages} chatSetMessage={setMessages} chatState = {chatState} nameTop={nameTop} partnerImage={partnerImage} myImage={props.myImage} />
        <ContactList time={time} setTime={setTime} setOtherUser = {setOtherUser} password={props.password} username={props.username} chatsUsers={props.chatsUsers} setchatsUsers={props.setchatsUsers} info={props.info} chatSetMessage={setMessages} setchatState={setchatState} chatState = {chatState} setnameTop={setnameTop} setpartnerImage={setpartnerImage}/>
        </div>
    );
  }
  export default ChatPage;
  