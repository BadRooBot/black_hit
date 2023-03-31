import express from 'express';

import { get_message,add_data_to_chat_list_table,delete_list,update_message_isSeen ,make_chat_table_and_send_message,login,posts,getAllUser,for_test,update_user_points,update_user_gender,update_user_image_url,update_user_password ,update_user_email ,deleteUser,signup,addPost,get_posts,getOneUser,update_user_name,get_my_posts,add_comment} from '../controllers/users.js';
const router=express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.get('/posts',posts);
router.post('/add-post',addPost);
router.get('/get-posts',get_posts);
router.post('/get-my-posts',get_my_posts);
router.post('/add-comment',add_comment);

router.post('/get-one-user',getOneUser);
router.get('/get-All-user',getAllUser);
router.post('/delete-user',deleteUser);

router.post('/update-user-name',update_user_name);
router.post('/update-user-password',update_user_password);
router.post('/update-user-email',update_user_email);
router.post('/update-user-image-url',update_user_image_url);
router.post('/update-user-gender',update_user_gender);
router.post('/update-user-points',update_user_points);
//router.post('/up/:email/:key/:val?/:key2?/:val2?',update);

router.post('/send-message', make_chat_table_and_send_message);

router.post('/get-message', get_message);
router.post('/update_message_is_seen', update_message_isSeen);
router.post('/delete-list', delete_list);

router.get('/for-test-add-data-to-chat-list',add_data_to_chat_list_table);



router.get('/for-test',for_test);



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