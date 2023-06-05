import Users from '../models/Users.js'
import jwt from "jsonwebtoken"
const key="our key";
export async function postUsers(req,res) {
   if(( await Users.postUsers(req.body.username,req.body.password, req.body.displayName,req.body.profilePic))) {
    res.status(200).send('');
   } else {
    res.status(409);

   }
}
export function getUsers(req,res) {
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(" ")[1];
        try {
        // Verify the token is valid
        const data = jwt.verify(token, key);
        const username= data.username;  
        if(username===req.query.id) {
            let ret=Users.getUsers(req.query.id);
            //לוודא שככה נגיע לid
                res.status(200).send(ret);
            } else {
            res.status(409).send('you dont have the fit token');
            }
        
        } catch (err) {
        res.status(401).send("Invalid Token");
        return
        }
    }
    else {
        res.status(403).send('Token required');
    }    
 }
 


 
