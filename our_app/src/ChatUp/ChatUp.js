import {BrowserRouter , Routes, Route, Link}  from 'react-router-dom';
function ChatUp(props) {
    return (
    <div class="header">
        <button type="button" class="btn btn-outline-danger Logout">
            <Link to="/" class="btn leave" >Log Out</Link></button>
        <div class="userPicName">
                <img
                src = {props.myImage}
                className="img-fluid rounded-circle"
                width="90"
                height="90"                
                />
                <div className="speech-bubble userPicName">{props.inMyChat}</div>
        </div>
        <div>Chat Room</div>
    </div>
    )
}
export default ChatUp;
