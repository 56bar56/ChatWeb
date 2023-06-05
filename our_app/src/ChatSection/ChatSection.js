import React, { useState } from 'react';
async function getToken(username, password) {
  const data = {
    username: username,
    password: password
  }
  const res = await fetch('http://localhost:5000/api/Tokens', {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json',
    },
    'body': JSON.stringify(data)
  })
  const token = await res.text();
  return token;
}

async function getChat(token, id) {
  const res = await fetch('http://localhost:5000/api/Chats/' + id + '/Messages', {
    'method': 'get',
    'headers': {
      'authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
  });

  const information = await res.text();
  return information;
}

async function chatContacts(token) {
  const res = await fetch('http://localhost:5000/api/Chats', {
    'method': 'get',
    'headers': {
      'authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify()
  })
  return res.text();
}

async function postMsg(token, id, msg) {
  const data = {
    msg: msg
  }
  const res = await fetch('http://localhost:5000/api/Chats/' + id + '/Messages', {
    'method': 'post',
    'headers': {
      'authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify(data)
  });
  const information = await res.text();
  return information;
}

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
  const handleSendMessage = async () => {
    if (props.users.length === 0) {
      setNoContactChosen("you didnt chose a contact");

    } else {
      setNoContactChosen('');

      const newMessage = messageInputValue.trim();
      if (newMessage !== '') {

        const token = await getToken(props.username, props.password);
        const alreadyChats = await chatContacts(token);
        const parsedOutput = JSON.parse(alreadyChats);

        const usernameToFind = props.otherUser; // The username to search for
        let foundId = -1;

        parsedOutput.forEach((obj) => {
          if (obj.user.username === usernameToFind) {
            foundId = obj.id;
          }
        });

        if (foundId !== -1) {
          const alreadyChats = await postMsg(token, foundId, newMessage);
          const allMsg = await getChat(token, foundId);
          const newAllMsg = JSON.parse(allMsg);
          const sortedMessages = newAllMsg.sort((a, b) => a.id - b.id); //maybe need to be deleted but dont know yet
          const lastMessage = sortedMessages[sortedMessages.length - 1];
          
          const updatedChatsUsers = [...props.chatsUsers]; // Create a copy of the array
          for (let i = 0; i < props.chatsUsers.length; i++) {
            if (updatedChatsUsers[i].user.username === props.otherUser) {
              updatedChatsUsers[i].lastMessage = lastMessage;
            }
          }

          props.setchatsUsers(updatedChatsUsers); // Set the modified array back to the useState variable
          props.chatSetMessage(sortedMessages);
        }
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
                <div
                className={
                  (message.sender.username === props.username)
                    ? 'user2 clearfix'
                    : 'user1 clearfix'
                }>
                  <img
                    src={
                      (message.sender.username === props.username)
                      ? props.profilePic
                      : props.partnerImage
                    }
                    className="img-fluid rounded-circle"
                    width="40"
                    height="25"
                    alt="User 2"
                  />
                  <div className="speech-bubble">{message.content}</div>
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
