import Chats from '../models/Chats.js'
import jwt from "jsonwebtoken"
const key="our key";
export async function getChats(req,res) {
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(" ")[1];
        try {
        // Verify the token is valid
        const data = jwt.verify(token, key);
        const username= data.username; 
        const chats= await Chats.getChats(username);
        res.status(200).send(chats);
        //res.status(200).send("hellooo");
        } catch (err) {
        res.status(401).send("Invalid Token");
        }
    }
    else {
     res.status(403).send('Token required');
    }     

}

export async function postChats(req,res) {
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(" ")[1];
        try {
        // Verify the token is valid
        const data = jwt.verify(token, key);
        const username= data.username;  
        let ret= await Chats.postChats(username,req.body.username);
        res.status(200).send(ret);
    
        } catch (err) {
        res.status(401).send("Invalid Token");
        return
        }
    }
    else {
     res.status(403).send('Token required');
     return
    }    
}
 
