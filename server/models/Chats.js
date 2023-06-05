import { MongoClient } from 'mongodb';

async function getChats(userName) {
    const client= new MongoClient('mongodb://127.0.0.1:27017');
    let returnChats=[];
    try {
        const db= client.db("whatsapp");
        const chatsCollection=db.collection("chats");
        let chat1 = await chatsCollection.find({"user1.username": userName}).toArray();
        let chat2 = await chatsCollection.find({"user2.username": userName}).toArray();
        let chats=[...chat1, ...chat2];
        console.log("1");
        for (let i=0; i<chats.length;i++) {
            let chat;
            if(chats[i].user1.username===userName) {
                chat={"id": chats[i]._id,  "user" : chats[i].user2, "lastMessage" : chats[i].lastMessage }
            } else {
                chat={"id": chats[i]._id, "user" : chats[i].user1, "lastMessage" : chats[i].lastMessage }
            }
            returnChats.push(chat);
        }
        console.log("2");

    }
    finally {
        await client.close(); 
        console.log("2");
        return returnChats;
    }
}
async function postChats(userName, newUser) {
    const client= new MongoClient('mongodb://127.0.0.1:27017');
    try {
        let id;
        const db= client.db("whatsapp");
        const user=db.collection("users");
        const chat=db.collection("chats");
        let inCon=await user.findOne({"username": userName});
        let con = await user.findOne({"username": newUser});
        if(!con) {
            await chat.insertOne({"user1" : {"username" : userName, "displayName" : inCon.displayName, "profilePic" : inCon.profilePic},
        "user2" : {"username" : newUser, "displayName" : con.displayName, "profilePic" : con.profilePic}, 
         "lastMessage" : {}, "msgId" : []});
        let con = await chat.findOne({"user1.username": userName});
        id= con._id;
        }
    }
    finally {
        await client.close();  
        return {"id": id, "user" : {"username" : newUser, "displayName" : con.displayName, "profilePic" : con.profilePic}};  
    }
}

export default {
    getChats,
    postChats
}