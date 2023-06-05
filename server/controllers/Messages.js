import Messages from '../models/Messages.js'
import jwt from "jsonwebtoken"
const key="our key";
export function getMessages(req,res) {
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(" ")[1];
        try {
        // Verify the token is valid
        const data = jwt.verify(token, key);
        const username= data.username;  
        returnValue=Messages.getMessages(req.query.id);
        res.status(200).send(returnValue);
        
        } catch (err) {
        res.status(401).send("Invalid Token");
        return
        }
    }
    else {
        res.status(403).send('Token required');
    }    
//להוסיף בדיקות    
}


export function postMessages(req,res) {
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(" ")[1];
        try {
        // Verify the token is valid
        const data = jwt.verify(token, key);
        const username= data.username;  
        Messages.postMessages(username,req.query.id, req.body.msg);
        res.status(200);
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

