import { MongoClient, ObjectId } from 'mongodb';
    function getCurrentTime() {
    const currentTime = new Date();
    return currentTime;
  }

async function getMessages(id) {
    const client= new MongoClient('mongodb://127.0.0.1:27017');
    let masseges=[];
    try {
        const db= client.db("whatsapp");
        const chatsCollection=db.collection("chats");
        const messgaesCollection=db.collection("messages");
        const objectId = new ObjectId(id);
        let chat = await chatsCollection.findOne({_id: objectId});
        for(let i=0; i<chat.msgId.length;i++) {
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
    const client= new MongoClient('mongodb://127.0.0.1:27017');
    try {
        const db= client.db("whatsapp");
        const chatsCollection=db.collection("chats");
        const messgaesCollection=db.collection("messages");
        const time= getCurrentTime();
        const result=await messgaesCollection.insertOne({"sender" : {"username" : userName}, "content" : content, "created" : time});
        const update = { $push: { msgId: result.insertedId } };
        const chat = await chatsCollection.updateOne( { _id: new ObjectId(id)}, update);
        await chatsCollection.updateOne( { _id: new ObjectId(id) }, {$set : {lastMessage : {"id" : result.insertedId, "created" : time, "content" : content }}}); 
    }
    finally {
        await client.close();    
    }
  
}

export default {
    getMessages,
    postMessages
}
