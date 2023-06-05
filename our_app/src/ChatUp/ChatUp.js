import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
/*
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
  });

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
*/
function ChatUp(props) {
  
    return (
        <div className="header">
          <button type="button" className="btn btn-outline-danger Logout">
            <Link to="/" className="btn leave">Log Out</Link>
          </button>
          <div className="userPicName">
            <img
              src={
                props.profilePic ||
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
              }
              className="img-fluid rounded-circle"
              width="90"
              height="90"
            />
            <div className="speech-bubble userPicName">{props.username}</div>
          </div>
          <div>Chat Room</div>
        </div>
      );
  }
  
  export default ChatUp;
