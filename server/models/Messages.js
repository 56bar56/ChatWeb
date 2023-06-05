import { MongoClient, ObjectId } from 'mongodb';
    function getCurrentTime() {
    const currentTime = new Date();
    return currentTime;
  }

async function getMessages(username,id) {
    const client= new MongoClient('mongodb://127.0.0.1:27017');
    let masseges=[];
    let returnSituation=1;
    try {
        const db= client.db("whatsapp");
        const usersCollection=db.collection("users");
        const user=await usersCollection.findOne({"username": username});
        if(user===null) {
            returnSituation=2;
        } else {
            const chatsCollection=db.collection("chats");
            const messgaesCollection=db.collection("messages");
            const objectId = new ObjectId(id);
            let chat = await chatsCollection.findOne({_id: objectId});
            if(chat===null) {
                returnSituation=3;
            } else {
                for(let i=0; i<chat.msgId.length;i++) {
                    let oneMassege= await messgaesCollection.findOne({_id : chat.msgId[i]});
                    masseges.push(oneMassege);
                }
            }
        }
    }
    finally {
        await client.close(); 
        if(returnSituation===1) {
            return masseges;
        } else {
            return returnSituation;
        }
    }
  
}
async function postMessages(userName,id,content) {
    const client= new MongoClient('mongodb://127.0.0.1:27017');
    let returnSituation=1;
    try {
        const db= client.db("whatsapp");
        const usersCollection=db.collection("users");
        const user=await usersCollection.findOne({"username": userName});
        if(user===null) {
            returnSituation=2;
        } else {
            const chatsCollection=db.collection("chats");
            const messgaesCollection=db.collection("messages");
            const chat =await chatsCollection.findOne({_id: new ObjectId(id)});
            if(chat===null) {
                returnSituation=3;
            } else {
                const time= getCurrentTime();
                const result=await messgaesCollection.insertOne({"sender" : {"username" : userName}, "content" : content, "created" : time});
                const update = { $push: { msgId: result.insertedId } };
                await chatsCollection.updateOne( { _id: new ObjectId(id)}, update);
                await chatsCollection.updateOne( { _id: new ObjectId(id) }, {$set : {lastMessage : {"id" : result.insertedId, "created" : time, "content" : content }}}); 
            }     
        }
    }
    finally {
        await client.close();    
        return returnSituation;
    }
  
}

export default {
    getMessages,
    postMessages
}
