import { useState } from 'react';

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

function ListItem(props) {
  const [name, setName] = useState('');

  async function clickActive() {
    props.setchatsUsers((prevUsers) => {
      const temp = prevUsers.map((user) => {
        if (user.id === props.obj.id) {
          return { ...user, active: true };
        } else {
          return { ...user, active: false };
        }
      });
      const selectedUser = temp.find((user) => user.id === props.obj.id);
      props.setchatState(selectedUser.id);
      props.setnameTop(selectedUser.user.displayName);
      props.setpartnerImage(selectedUser.user.profilePic);
      setName(selectedUser.user.username);
      handleUsernameChange(selectedUser.user.username); // Call the function to handle the username change
      return temp;
    });
  }

  async function handleUsernameChange(username) {
    props.setOtherUser(username);
    const token = await getToken(props.username, props.password);

    const alreadyChats = await chatContacts(token);
    const parsedOutput = JSON.parse(alreadyChats);

    const usernameToFind = username; // The username to search for
    let foundId = -1;

    parsedOutput.forEach((obj) => {
      if (obj.user.username === usernameToFind) {
        foundId = obj.id;
      }
    });
    if (foundId !== -1) {
      const allMsg = await getChat(token, foundId);
      const newAllMsg = JSON.parse(allMsg);
      const sortedMessages = newAllMsg.sort((a, b) => a.id - b.id); //maybe need to be deleted but dont know yet
      console.log(sortedMessages);
      props.chatSetMessage(sortedMessages);
      // Separate messages into arrays based on the sender's username
      /*
      const username1Messages = sortedMessages
      .filter((message) => message.sender.username === props.username)
      .map((message) => message.content);

      const username2Messages = sortedMessages
      .filter((message) => message.sender.username === username)
      .map((message) => message.content);
      */

      //console.log(username1Messages); // ["hi", "whats up"]
      //console.log(username2Messages); // []
      //console.log(allMsg);
    }
  }

  return (
    <div
      onClick={clickActive}
      className={
        props.obj.active
          ? 'list-group-item list-group-item-action active'
          : 'list-group-item list-group-item-action'
      }
    >
      <img
        src={
          props.obj.user.profilePic ||
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        }
        className="img-fluid rounded-circle"
        width="40"
        height="25"
        alt=""
      />
      {props.obj.user.username}
      <p className="date">
        {props.obj.lastMessage
          ? new Date(props.obj.lastMessage.created).toLocaleTimeString()
          : ''}
      </p>
    </div>
  );
}

export default ListItem;