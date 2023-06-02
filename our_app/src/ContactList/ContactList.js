import React, { useState, useRef, useEffect } from 'react';
import ListItem from '../ListItem/ListItem';
function ContactList(props) {
  let [messageAddContact,setmessageAddContact] = useState('');
  const taskInput = useRef(null);
  const taskList = useRef(null);
  const modal = useRef(null);
  const activeItem = useRef(null);

  //props.setchatsUsers(JSON.parse(props.infoContacts));

  function addContactBtn() {
    modal.current.classList.add('show');
    modal.current.style.display = 'block';
  }
  function addTaskBtn() {
    const newContact = taskInput.current.value.trim();
    if (newContact !== '') {
      addCon(newContact);
      modal.current.classList.remove('show');
      modal.current.style.display = 'none';
      taskInput.current.value = '';
    }
  }

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

  async function newChat(username, token) {
    const data = {
      username: username
    }

    const res = await fetch('http://localhost:5000/api/Chats', {
      'method': 'post',
      'headers': {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify(data)
    })
    return await res.text();
  }

  async function chatContacts(token) {

    const res = await fetch('http://localhost:5000/api/Chats', {
      'method': 'get',
      'headers': {
        'authorization': 'Bearer ' + token, //getToken(props.username, props.password),
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify()
    })
    return res.text();
  }


  async function addCon(newCon) {
    setmessageAddContact('');

    const token = await getToken(props.username, props.password);
    const res = await newChat(newCon, token);

    if(res === "No such user")
      setmessageAddContact('Username does not exist');
    else{
      const infoForChatUsers = await chatContacts(token);
      props.setchatsUsers(JSON.parse(infoForChatUsers));
    }

  }

  return (
    <div className="contant">
      <button onClick={addContactBtn} data-bs-toggle="modal" className="btn btn-primary addContant" data-bs-target="#exampleModal">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-add" viewBox="0 0 16 16">
          <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
          <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
        </svg>
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        ref={modal}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Add Contact:</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  modal.current.classList.remove('show');
                  modal.current.style.display = 'none';
                }}
              ></button>
            </div>
            <div className="modal-body">
              <form id="taskForm">
                <input
                  type="name"
                  className="form-control"
                  id="exampleFormControlInput1"
                  ref={taskInput}
                  placeholder="Contact UserName"
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
              onClick={addTaskBtn}
              className="btn btn-primary"
              data-bs-dismiss="modal"
              >Save</button>
            </div>
          </div>
        </div>
      </div>
      <ul className="list-group">
        {props.chatsUsers.map((item, index) => (
          <ListItem
            key={index}
            obj={item}
            setchatsUsers={props.setchatsUsers}
            //chatSetMessage={props.chatSetMessage}
            setchatState={props.setchatState}
            setnameTop={props.setnameTop}
            setpartnerImage={props.setpartnerImage}
          />
        ))}
      </ul>

      <div>
        <div className="message">{messageAddContact}</div>
      </div>
    </div>
  );
}

export default ContactList;






