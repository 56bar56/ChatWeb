import express from 'express'
import bodyParser from 'body-parser'
import routerToken from './routes/Tokens.js'
import routerChats from './routes/Chats.js'
import routerUsers from './routes/Users.js'
const server= express();

server.use(express.static('public'));
server.use(express.json());
server.use(bodyParser());
//server.set('view engine', 'ejs');
server.use('/api/Tokens',routerToken);
server.use('/api/Chats',routerChats);
server.use('/api/Users',routerUsers);

server.listen(5000);