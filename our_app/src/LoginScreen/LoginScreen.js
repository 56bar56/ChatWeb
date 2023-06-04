import { useRef } from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
function LoginScreen(props) {
    
    const usernameInput = useRef(null);
    const passwordInput = useRef(null);
    let [messageLoginF,setmessageLoginF] = useState('');
    const navigate = useNavigate();
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
    async function getInfo(token, username) {
      const res = await fetch('http://localhost:5000/api/Users/' + username, {
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
          'authorization': 'Bearer ' + token, //getToken(props.username, props.password),
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify()
      })
      return res.text();
    }
  

     async function logIn () {
        const username = usernameInput.current.value;
        const password = passwordInput.current.value;
        let weDontMove=1;
        const res = await getToken(username, password);
        //console.log(res);
        /*
        for (let i = 0; i < props.info.length; i++) { //checking if the user and password exist
            if (username === props.info[i].username && password === props.info[i].password) {
                weDontMove = 0;
                props.setinMyChat(username);
                props.setmyImage(props.info[i].img);
                i=props.info.length;
                navigate('/Chats'); // Navigate to the "/chat" route
            } 
        }
        */
        if(res === 'Incorrect username and/or password') { //In case it is not exist, prints error message
            passwordInput.current.value = '';
            usernameInput.current.value = '';
            setmessageLoginF('wrong password or username');
        }
        else{
          props.setPassword(password);
          props.setUsername(username);
          const infoForPicture = await getInfo(res, username);
          const data = JSON.parse(infoForPicture);
          const profilePic = data.profilePic;
          //console.log(profilePic);
          props.setProfilePic(profilePic);
          const infoForChatUsers = await chatContacts(res);
          console.log(infoForChatUsers);
          props.setchatsUsers(JSON.parse(infoForChatUsers));
          navigate('/Chats'); // Navigate to the "/chat" route
        }
    }



  return (
<div>
<div className="header">LogIn</div>
<div className="container">
  <div className="row">
    <div className="col-md-6 offset-md-3 login-form">
      <div className="form-group">
        <label>Username</label>
        <input className="form-control" ref = {usernameInput} placeholder="Username" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" ref = {passwordInput} className="form-control" placeholder="Password" />
      </div>
      <br />
      <button onClick={logIn}  className="btn btn-primary btn-block btn-wide" >
        Log In
      </button>
      <br />
      <br />
      <h8>Not registered? </h8>
      <Link to="/register" className="link">
        click here
      </Link>
      <h8> here to register </h8>
    </div>
  </div>
</div>
<div className="message">{messageLoginF}</div>
</div>
    );
}

export default LoginScreen;
