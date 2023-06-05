import loginModel from '../models/Tokens.js'
async function getToken(req,res) {
    const Token= await loginModel.getToken(req.body.username, req.body.password);
    if(Token==='Incorrect username and/or password') {
        res.status(404).send('Incorrect username and/or password');

    } else {
        res.status(200).send(Token);
    }    
}
export default getToken
