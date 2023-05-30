import React, { useState } from 'react';
function ChatSection(props) {
  const [messageInputValue, setMessageInputValue] = useState('');
  const [noContactChosen,setNoContactChosen]=useState('');
  const handleInputChange = (event) => {
    setMessageInputValue(event.target.value);
  };
  function getCurrentTime() {
    const currentTime = new Date();
    const time = currentTime.toLocaleTimeString();
    return time;
  }
  const handleSendMessage = () => {
    if(props.users.length===0) {
      setNoContactChosen("you didnt chose a contact");
    } else {
      setNoContactChosen('');
      const newMessage = messageInputValue.trim();
      if (newMessage !== '') {
        props.setUsers((prevUsers)=>{
          let temp=[...prevUsers];
          temp[props.chatState].chat.push(newMessage);
          temp[props.chatState].time = getCurrentTime();
          return temp;
      });
        props.chatSetMessage(props.users[props.chatState].chat);
        setMessageInputValue('');
      }
    }
   
  };

  return (
    <div>
      <div className="content"></div>
      <div className="currentChat">
        <div type="user" className="form-control namechat" id="floatingInputDisabled" disabled>
          <label htmlFor="floatingInputDisabled" className="currentChatUser">
           {props.partnerImage&&(<img
              src={props.partnerImage}
              className="img-fluid rounded-circle"
              width="40"
              height="25"
              alt="User 2"
            />)}
            {props.nameTop}
          </label>
        </div>
        <div className="message" >{noContactChosen}</div>
        <div className="container">
          <ul className="list-message no-dot-list" id="messageList">
            {props.chatMessages.map((message, index) => (
              <li key={index} className="list-message-item">
                <div className="user2 clearfix">
                  <img
                    src={props.myImage}
                    className="img-fluid rounded-circle"
                    width="40"
                    height="25"
                    alt="User 2"
                  />
                  <div className="speech-bubble">{message}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form className="currentChatKey input-group mb-3">
          <input
            type="text"
            id="messageInput"
            className="form-control"
            placeholder="enter message ..."
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={messageInputValue}
            onChange={handleInputChange}
          />
          <button
            type="button"
            id="sendMassege"
            className="btn btn-outline-secondary"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatSection;
