import { MongoClient } from 'mongodb';
    function getCurrentTime() {
    const currentTime = new Date();
    const time = currentTime.toLocaleTimeString();
    return time;
  }
async function getMessages(id) {
    const client= new MongoClient("mongodb://localhost:27017");
    try {
        const db= client.db("whatsapp");
        const chatsCollection=db.collection("chats");
        const messgaesCollection=db.collection("messages");
        let chat = await chatsCollection.findOne({_id: id});
        let masseges=[];
        for(let i; i<chat.msgId.length;i++) {
            let oneMassege= await messgaesCollection.findOne({_id : chat.msgId[i]});
            masseges.push(oneMassege);
        }
       
    }
    finally {
        await client.close();    
        return masseges;
    }
  
}
async function postMessages(userName,id,content) {
    const client= new MongoClient("mongodb://localhost:27017");
    try {
        const db= client.db("whatsapp");
        const chatsCollection=db.collection("chats");
        const messgaesCollection=db.collection("messages");
        const time= getCurrentTime();
        const result=await messgaesCollection.insertOne({"sender" : {"username" : userName}, "content" : content, "created" : time});
        const update = { $push: { msgId: result.insertedId } };
        const chat = await chatsCollection.updateOne( { _id: ObjectId(id) }, update);
        await chatsCollection.updateOne( { _id: ObjectId(id) }, {$set : {lastMessage : {"id" : result.insertedId, "created" : time, "content" : content }}}); 
    }
    finally {
        await client.close();    
    }
  
}

export default {
    getMessages,
    postMessages
}
