import loginModel from '../models/Tokens.js'
async function getToken(req,res) {
    console.log("hellooo");
    const Token= await loginModel.getToken(req.body.username, req.body.password);
    console.log(Token);
    if(Token==='Incorrect username and/or password') {
        res.status(404).send('Incorrect username and/or password');

    } else {
        res.status(200).send(Token);
    }    
}
export default getToken
