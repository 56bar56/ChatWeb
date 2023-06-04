import express  from 'express';
import getToken from '../controllers/Tokens.js'
const router=express.Router();
router.get('/',getToken);

export default router;