import React, { useState, useRef, useEffect } from 'react';
import ListItem from '../ListItem/ListItem';
function ContactList(props) {
  let [messageAddContact,setmessageAddContact] = useState('');
  const taskInput = useRef(null);
  const taskList = useRef(null);
  const modal = useRef(null);
  const activeItem = useRef(null);

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

  function addCon(newCon) {
    setmessageAddContact('');
    let equal=-1;
    let saveImage;
    for(let i=0; i< props.info.length;i++) {
      if(newCon===props.info[i].username) {
        for(let j=0; j< props.users.length;j++) {
          if(newCon===props.users[j].name) {
            equal=-2;
            break;
          }
        }
        if(equal === -2)
          break;
        equal=i;
        saveImage=props.info[i].img;
        break;
      }
      
    }
    if(equal >= 0) {
      taskInput.current.value = '';
  
      // Remove active class from all items
      // Attach click event listener to the newly created list item
      const newChat=[];
      const newPerson = { name: newCon, chat: newChat,  active: false, img: saveImage, time: "" };
     // const newArray=[...props.users, newPerson];
      //props.setUsers(prevArray => [...prevArray, newPerson]);
      props.setUsers((prevUsers)=>{
        let temp=[...prevUsers]
        temp.push(newPerson);
        return temp;
      });

    } else {
      if(equal=== -1)
        setmessageAddContact('Username does not exist');
      else
        setmessageAddContact('Username was already added');

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
        {props.users.map((item, index) => (
          <ListItem obj={item} setUsers={props.setUsers} chatSetMessage={props.chatSetMessage} setchatState={props.setchatState} setnameTop={props.setnameTop} setpartnerImage={props.setpartnerImage}/>
        ))}
      </ul>
      <div>
        <div className="message">{messageAddContact}</div>
      </div>
    </div>
  );
}

export default ContactList;






