import express from 'express';

import { createUser,deletUset ,getUsers,getUsersById,read,writeUser,update,deleteReq} from '../controllers/users.js';
const router=express.Router();



router.get('/',getUsers);

router.post('/',createUser);

router.post('/read',read);
router.post('/write',writeUser);
router.get('/:id?',getUsersById);

router.get('/up/:email/:key/:val?',update);


router.get('/up/:email/:key/:val?/:key2?/:val2?',update);

router.get('/delete/:email/:key/:val?/:key2?/:val2?',deleteReq);

router.delete('/:id',deletUset);




export default router;










/*

{"name":`${name}`,"email":`${email}`,
"password":`${password}`,"profileImage":`${profileImage}`,
"online":false,"id":`${userId}`,
"follwos":[],
"follwoing":[],
"points":0,
"isVIP":false,
"online":false
}*/