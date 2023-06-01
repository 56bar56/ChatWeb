import './App.css';
import { useRef, useState } from 'react';
import {BrowserRouter , Routes, Route, Link}  from 'react-router-dom';
import LoginScreen from './LoginScreen/LoginScreen';
import RegisterScreen from './RegisterScreen/RegisterScreen';
import ChatPage from './ChatPage/ChatPage';
function App() {
  const [loginDetails,setLoginDetails] = useState([
    { username: "ofek", password: "12", profilename: "fati", email: "fati@gmail.com", img: "https://cdn.vox-cdn.com/thumbor/91C8cGj1i1h9VlMayTiAorSoDpI=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22879573/1235519898.jpg" },
    { username: "bar", password: "123", profilename: "haaland", email: "haaland@gmail.com", img: "https://static01.nyt.com/images/2022/10/30/multimedia/30onsoccer-hattracik--1-1cef/30onsoccer-hattracik--1-1cef-mediumSquareAt3X.jpg" },
    { username: "ariel", password: "1234", profilename: "lewandowski", email: "lewandowski@gmail.com", img: "https://static01.nyt.com/images/2021/04/29/sports/29soccer-lewandowski/29soccer-lewandowski-mediumSquareAt3X.jpg" }
  ]);
  const [inMyChat,setinMyChat]=useState(''); // maybe delete later 
  const [myImage,setmyImage]=useState(''); //delete later
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [profilePic,setProfilePic]=useState('');
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<LoginScreen setProfilePic={setProfilePic} setPassword={setPassword} setUsername={setUsername} setinMyChat={setinMyChat} setmyImage={setmyImage}/>}></Route>
      <Route path = "/register" element = {<RegisterScreen setProfilePic={setProfilePic} setPassword={setPassword} setUsername={setUsername} setInfo={setLoginDetails} setinMyChat={setinMyChat} setmyImage={setmyImage} myImage= {myImage} />}></Route>
      <Route path = "/Chats" element = {<ChatPage profilePic={profilePic} password={password} username={username} info = {loginDetails} inMyChat={inMyChat} myImage={myImage}/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}
export default App;
