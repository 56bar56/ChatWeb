import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LoginScreen from './LoginScreen/LoginScreen.js';
import './LogIn.css';
import ContactList from './ContactList/ContactList.js';
import RegisterScreen from './RegisterScreen/RegisterScreen.js'; 
import './register.css';

import ChatUp from './ChatUp/ChatUp.js'; 

import ChatSection from './ChatSection/ChatSection.js'; 
import './Chat.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <App/>
  </React.StrictMode>
);

