# Advanced Programing 2

Advanced programming 2 course assignments by Ofek Binder, Bar Ben Tovim and Ariel Oscar.

## Ex.2

### Description

Implementing a chat web, using react, js, html, css, swagger, NodeJS, MongoDB and WebSockets. We built a chat web, with a login\register page, and chat page. All the data about the users and their chats is saved in a data base. In the login we made sure that only connected users can login to the chats, if you havn't register yet, you can press on the link "register" and it gets you into the register page. In the register page you have to register with username, password, email, image, and a profile name. While registering to our app you cannot leave most of the fields empty and have to fill them according to the demands. If the username or password are already used by another user, you'll have to change them. After connecting to our app you'll see all the contacts you alreadt added to your contacts list. You can add a new contact by clicking on the "+contact" and typing its username. You can press on ant of your contact and your chat will show on the screen. Now you can send anything to the person you chat with and also get messages from it in live. Clicking on another contact, the chat with it will show up. Our web saves all your chats after logout.

#### part 1:
In this part we are using swagger web (html.index/swagger:5000/localhost://h). The swagger functions as a server and a data base that saves all the data of our web (users and their chats) and connecting the users so they can send and get messages to/from each other. Swagger saves the data about each user and it has an API methods such as get users and add new user if it is not exist, get chat with specific contact and add new message to a contact, and get token. A token is a string that changes every few seconds and belong to the user that is connected. The token is like an authorization of the user to do all the things in the chat page. We calculate the tocken each time the user tries to do something (add contact, send message, etc).

#### part 2:
In this part we built our own "swagger" that functions as a NodeJS server and a database. We used MongoDB as a database, and build our own API methods (similar to the ones in the Swagger).

#### part 3:
In this part we take care of an incident when 2 users are connected and send messages to each other, so they will get the messages from the other user in live immidiatly.
We use WebSockets to inplement it. In the client side, function Socket.emit sends to the server the chat id, and function Socket.on gets the updated chat with the user. In the server side it uses the id of the user, calculate the updated caht and send it to the client.
 
Page componants:
  ChatPage - this component connects all the different parts of the chat page.
  ChatSection - the chat part of the chat page, with the profile name of the user you are talking with and its profile image. An input and sent button.
  ChatUp - the top part of the chat page screen with your username, profile image and logout button.
  ContactList - the part of your contacts in the chat page.
  LoginScreen - the log in page with username and password inputs.
  RegisterScreen - the register page with username, password, email, profile image, and a profile name inputs.
  
Server components:
  folder controllers (takes care of API methods):
    # Chats.js
    # Messages.js
    # Tokens.js
    # Users.js
  models folder:
    # Chats.js
    # Messages.js
    # Tokens.js
    # Users.js
  app.js - the actual server withh all the relevant functions.
 
 
### Executing the program

```
from the client :
npm run build
and then take the build folder and nove it to the public in the server
in the server we run:
node app.js
```

### Dependencies

import React, { useState, useRef, useEffect } from 'react';
import {BrowserRouter , Routes, Route, Link}  from 'react-router-dom';
and just using react and router and so on.
