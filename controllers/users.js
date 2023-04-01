
import { v4 as uuidv4} from 'uuid';
import fs from'fs';
import  pkg  from'pg';
const {Client} = pkg;

let testbadroobot;
let chunkJson;

//for lg in
export const login=async (req,res)=>{
   
  const { email, password} = req.body;
         const client = new Client({
      user: 'badroobot',
      host:"badroobot.postgres.database.azure.com",
      database: 'badroobot',
      password: 'Anakillmesho9',
      ssl: true,
      port: 5432,
});
          try {
            await client.connect();
            const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
            const result = await client.query(query);
            if (result.rows.length === 1) {
             res.status(200).json(result.rows[0]);
            } else {
              res.status(500).end('Login failed');
            }
            //await client.status(500).end();
          } catch (err) {
            console.error(err);
            res.status(500).end('Login failed');
          }
        }
      
    

export const signup=async (req,res)=>{  
    
    const { username, password, email, image_url, gender, points } = req.body;
    const userId=uuidv4();
    const client = new Client({
      user: 'badroobot',
      host:"badroobot.postgres.database.azure.com",
      database: 'badroobot',
      password: 'Anakillmesho9',
      ssl: true,
      port: 5432,
});
      client.connect();
  const query = `
    INSERT INTO users (username, password, email, image_url, gender, points,id)
    VALUES ($1, $2, $3, $4, $5, $6,$7)
    
    RETURNING *;`;

  const values = [username, password, email, image_url, gender, points,userId];
  
  client.query(query, values).then(result => {
  add_data_to_chat_list_table(result.rows[0]['id']);
    res.status(200).json(result.rows[0]);
  }).catch(err => {
    res.status(500).json({ error: err.message });
  });

  
};

export const posts =(req,res)=>{  

    const client = new Client({
      user: 'badroobot',
      host:"badroobot.postgres.database.azure.com",
      database: 'badroobot',
      password: 'Anakillmesho9',
      ssl: true,
      port: 5432,
});

client.connect();

const query1 = `
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  image_url TEXT,
  Gender TEXT,
  points INTEGER DEFAULT 0
);
`;

client.query(query1, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Table created successfully');
  }
});
      
      const query = `
      CREATE TABLE posts (
        post_id SERIAL PRIMARY KEY,
        user_id TEXT REFERENCES users (id),
        post_text TEXT,
        post_image_url TEXT,
        likes INTEGER,
        dislike INTEGER,
        comments jsonb
      );
      
      ALTER TABLE posts ALTER COLUMN likes SET DEFAULT 0;
      ALTER TABLE posts ALTER COLUMN dislike SET DEFAULT 0;
      `;
      
      client.query(query).then(() => {
        res.status(201).json({ message: 'Post added successfully' });
      }).catch(err => {
        res.status(500).json({ message: err.message });
      });
}

export const addPost = async (req, res) => {
  const { user_id, post_text, post_image_url, likes, dislike, comments } = req.body;


  const client = new Client({
    user: 'badroobot',
    host: 'badroobot.postgres.database.azure.com',
    database: 'badroobot',
    password: 'Anakillmesho9',
    ssl: true,
    port: 5432,
  });

  client.connect();

  const query = `
    INSERT INTO posts (user_id, post_text, post_image_url, likes, dislike, comments)
    VALUES ($1, $2, $3, $4, $5, $6)
  `;

  const values = [user_id, post_text, post_image_url, likes, dislike, JSON.stringify(comments)];

  try {
    await client.query(query, values);
    res.status(200).json({ message: 'Post added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add post' });
  } finally {
    client.end();
  }
};


  export const get_posts =async(req,res)=>{ 
    const client = new Client({
      user: 'badroobot',
      host:"badroobot.postgres.database.azure.com",
      database: 'badroobot',
      password: 'Anakillmesho9',
      ssl: true,
      port: 5432,
});
      client.connect();
    const query = `
    SELECT *
    FROM posts
  `;

  client.query(query, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result.rows);
    }
  });
};





export const deleteUser=(req,res)=>{   
    const client = new Client({
      user: 'badroobot',
      host:"badroobot.postgres.database.azure.com",
      database: 'badroobot',
      password: 'Anakillmesho9',
      ssl: true,
      port: 5432,
});
      client.connect();

      
        const { user_id } = req.body; // assuming user_id is in the request body
      
        try {
        
           client.query('DELETE FROM users WHERE id = $1', [user_id]);
          
      
          res.status(200).json({
            message: `User with id ${user_id} has been deleted`,
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({
            message: 'An error occurred while deleting the user',
          });
        }
     
   
      
};



export const getOneUser = async (req, res) => {
  const { user_id } = req.body;

  const client = new Client({
    user: 'badroobot',
    host: 'badroobot.postgres.database.azure.com',
    database: 'badroobot',
    password: 'Anakillmesho9',
    ssl: true,
    port: 5432,
  });
  client.connect();
  const query = `
    SELECT *
    FROM users WHERE id=${user_id}
  `;
try{
client.query(query, (err, result) => {
   /* if (err) {
      res.status(500).send(err);
    } else {*/
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).send(result.rows);
   // }
  });
}catch{
console.log("error");
}
  
};


export const getAllUser  =async (req,res)=>{ 
  const {user_id} = req.body;

  const client = new Client({
    user: 'badroobot',
    host:"badroobot.postgres.database.azure.com",
    database: 'badroobot',
    password: 'Anakillmesho9',
    ssl: true,
    port: 5432,
});
    client.connect();
  const query = `
  SELECT *
  FROM users 
`;

client.query(query, (err, result) => {
  if (err) {
    res.status(500).send(err);
  } else {
    res.send(result.rows);
  }
});
};



export const update_user_name  =async (req,res)=>{
  const client = new Client({
    user: 'badroobot',
    host: 'badroobot.postgres.database.azure.com',
    database: 'badroobot',
    password: 'Anakillmesho9',
    ssl: true,
    port: 5432,
  });
  
  client.connect();
  
  const { user_id ,new_username} = req.body;
  
  const query = {
    text: 'UPDATE users SET username = $1 WHERE id = $2',
    values: [new_username, user_id],
  };
  
  client.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      console.log(`Username updated for user with ID ${user_id}`);
      res.status(200).send(`Username updated for user ID= ${user_id} and new name is ${new_username} and result=${result.rows}`);
      // Handle the success here
    }
    client.end();
  });
};


export const update_user_password  =async (req,res)=>{
  const client = new Client({
    user: 'badroobot',
    host: 'badroobot.postgres.database.azure.com',
    database: 'badroobot',
    password: 'Anakillmesho9',
    ssl: true,
    port: 5432,
  });
  
  client.connect();
  
  const { user_id ,new_password} = req.body;
  
  const query = {
    text: 'UPDATE users SET password = $1 WHERE id = $2',
    values: [new_password, user_id],
  };
  
  client.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      console.log(`password updated for user with ID ${user_id}`);
      res.status(200).send(`password updated for user ID= ${user_id} and new password is ${new_password} `);
      // Handle the success here
    }
    client.end();
  });
};


export const update_user_email  =async (req,res)=>{
  const client = new Client({
    user: 'badroobot',
    host: 'badroobot.postgres.database.azure.com',
    database: 'badroobot',
    password: 'Anakillmesho9',
    ssl: true,
    port: 5432,
  });
  
  client.connect();
  
  const { user_id ,new_email} = req.body;
  
  const query = {
    text: 'UPDATE users SET email = $1 WHERE id = $2',
    values: [new_email, user_id],
  };
  
  client.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      console.log(`email updated for user with ID ${user_id}`);
      res.status(200).send(`email updated for user ID= ${user_id} and new email is ${new_email} `);
      // Handle the success here
    }
    client.end();
  });
};


export const update_user_image_url  =async (req,res)=>{
  const client = new Client({
    user: 'badroobot',
    host: 'badroobot.postgres.database.azure.com',
    database: 'badroobot',
    password: 'Anakillmesho9',
    ssl: true,
    port: 5432,
  });
  
  client.connect();
  
  const { user_id ,new_image_url} = req.body;
  
  const query = {
    text: 'UPDATE users SET image_url = $1 WHERE id = $2',
    values: [new_image_url, user_id],
  };
  
  client.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      console.log(`image_url updated for user with ID ${user_id}`);
      res.status(200).send(`image_url updated for user ID= ${user_id} and new image_url is ${new_image_url} `);
      // Handle the success here
    }
    client.end();
  });
};

export const update_user_gender =async (req,res)=>{
  const client = new Client({
    user: 'badroobot',
    host: 'badroobot.postgres.database.azure.com',
    database: 'badroobot',
    password: 'Anakillmesho9',
    ssl: true,
    port: 5432,
  });
  
  client.connect();
  
  const { user_id ,new_gender} = req.body;
  
  const query = {
    text: 'UPDATE users SET gender = $1 WHERE id = $2',
    values: [new_gender, user_id],
  };
  
  client.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      console.log(`gender updated for user with ID ${user_id}`);
      res.status(200).send(`gender updated for user ID= ${user_id} and new gender is ${new_gender} `);
      // Handle the success here
    }
    client.end();
  });
};


export const update_user_points =async (req,res)=>{
  const client = new Client({
    user: 'badroobot',
    host: 'badroobot.postgres.database.azure.com',
    database: 'badroobot',
    password: 'Anakillmesho9',
    ssl: true,
    port: 5432,
  });
  
  client.connect();
  
  const { user_id ,new_points} = req.body;
  
  const query = {
    text: 'UPDATE users SET points = $1 WHERE id = $2',
    values: [new_points, user_id],
  };
  
  client.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      console.log(`points updated for user with ID ${user_id}`);
      res.status(200).send(`${new_points}`);
      // Handle the success here
    }
    client.end();
  });
};



export const get_my_posts =async(req,res)=>{
    const {user_id} = req.body;

    const client = new Client({
      user: 'badroobot',
      host:"badroobot.postgres.database.azure.com",
      database: 'badroobot',
      password: 'Anakillmesho9',
      ssl: true,
      port: 5432,
});
      client.connect();
    const query = `
    SELECT *
    FROM posts WHERE user_id=${user_id}
  `;

  client.query(query, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result.rows);
    }
  });
};

export const add_comment = async (req, res) => {
    const { post_id, comment_id, user_id, comment_text, comment_image } = req.body;

    const client = new Client({
        user: 'badroobot',
        host:"badroobot.postgres.database.azure.com",
        database: 'badroobot',
        password: 'Anakillmesho9',
        port: 5432,
    });
    client.connect();
    const query = `
        SELECT *
        FROM posts
        WHERE post_id = ${post_id}
    `;

    client.query(query, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            let comments = result.rows[0]["comments"];
            //comments = comments ? JSON.parse(comments) : [];
            comments.push({ comment_id, user_id, comment_text, comment_image });
            comments = JSON.stringify(comments);

            const query2 = `
                UPDATE posts
                SET comments = '${comments}'
                WHERE post_id = ${post_id};
            `;

            client.query(query2, (err, result) => {
                if (err) {
                    res.status(500).send(err + " " + result);
                } else {
                    res.send({ message: 'Comment added successfully' });
                }
            });
        }
    });
};


export const get_message =async(req,res)=>{
  const {chat_id,to} = req.body;

  const client = new Client({
    user: 'badroobot',
    host:"badroobot.postgres.database.azure.com",
    database: 'badroobot',
    password: 'Anakillmesho9',
    ssl: true,
    port: 5432,
});
    client.connect();
  const query = `
  SELECT * FROM chat_${chat_id} WHERE from_user ='${to}' OR to_user = '${to}';
`;

client.query(query, (err, result) => {
  if (err) {
    res.status(500).send(err);
  } else {
    res.status(200).send(result.rows);
  }
});
};

/**<script src="https://code.responsivevoice.org/responsivevoice.js?key=YWKR83mb"></script> */


export const make_chat_table_and_send_message =async (req,res)=>{
  const client = new Client({
    user: 'badroobot',
    host: 'badroobot.postgres.database.azure.com',
    database: 'badroobot',
    password: 'Anakillmesho9',
    ssl: true,
    port: 5432,
  });
  
  client.connect();
  
  const { user_id,to,from,message,image_url,video_url,time } = req.body;
  
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS chat_${user_id} (
    to_user TEXT NOT NULL,
    from_user TEXT NOT NULL,
    message TEXT,
    image_url TEXT,
    video_url TEXT,
    message_id  SERIAL PRIMARY KEY,
    time TIMESTAMP DEFAULT NOW(),
    is_seen BOOLEAN DEFAULT FALSE
  )
`;

 client.query(createTableQuery, (err, Query_res) => {
  if (err) {
    res.send(err);
  } else {
   send_message(res,user_id,to,from,message,image_url,video_url,time);
   make_chat_list_table_and_add_id_to_list(user_id,to);
  }
  client.end();
});
}



const send_message=(result_server,chat_id,to,from,message,image_url,video_url,time)=>{
  const client = new Client({
    user: 'badroobot',
    host: 'badroobot.postgres.database.azure.com',
    database: 'badroobot',
    password: 'Anakillmesho9',
    ssl: true,
    port: 5432,
  });
  
  client.connect()
  .then(() => console.log('Connected to the database!'))
  .then(() => {
    // Insert data into chat_1 table
    const query = {
    text: `INSERT INTO chat_${chat_id} (to_user, from_user, message, image_url, video_url, "time", "is_seen") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      values: [to, from, message, image_url,video_url , time, false],
    };

    return client.query(query);
  })
  .then(() => {
    // Retrieve data from chat_1 table
    const query = {
      text: `SELECT * FROM chat_${chat_id} WHERE from_user ='${to}' OR to_user = '${to}';   `,

    };

    return client.query(query);
  })
  .then(result => {
    console.log('Result:', result.rows);
    result_server.send(result.rows);
    return result.rows;
  })
  .catch(error => console.error('Error:', error))
  .finally(() => client.end());


  
}
export const update_message_isSeen = async (req, res) => {
  const client = new Client({
    user: 'badroobot',
    host: 'badroobot.postgres.database.azure.com',
    database: 'badroobot',
    password: 'Anakillmesho9',
    ssl: true,
    port: 5432,
  });

  try {
    await client.connect();

    const { user_id, is_seen, messageID } = req.body;

    const query = {
      text: 'UPDATE chat_$1 SET is_seen = $2 WHERE message_id = $3',
      values: [user_id, is_seen, messageID],
    };

    await client.query(query);

    res.status(200).send('B A D R O O B O T');
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  } finally {
    await client.end();
  }
};

export const delete_message = async (req, res) => {
  const client = new Client({
    user: 'badroobot',
    host: 'badroobot.postgres.database.azure.com',
    database: 'badroobot',
    password: 'Anakillmesho9',
    ssl: true,
    port: 5432,
  });

  try {
    await client.connect();

    const { messageID, chat_id } = req.body;

    await client.query('DELETE FROM chat_$2 WHERE message_id = $1', [
      messageID,
      chat_id,
    ]);

    res.status(200).json({
      message: `message with id ${messageID} has been deleted`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'An error occurred while deleting the message',
    });
  } finally {
    await client.end();
  }
};

 const make_chat_list_table_and_add_id_to_list = (user_id,to)=>{
  const client = new Client({
    user: 'badroobot',
    host: 'badroobot.postgres.database.azure.com',
    database: 'badroobot',
    password: 'Anakillmesho9',
    ssl: true,
    port: 5432,
  });
  
  client.connect();
  
  
  
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS chat_list (
    chat_list_for_user TEXT NOT NULL,
    list_chats JSONB,
    chat_list_id  SERIAL PRIMARY KEY
    
  );
`;

 client.query(createTableQuery, (err, Query_res) => {
  if (err) {
    console.log(err);
  } else {
    add_id_to_list_chat(user_id,to);
    console.log(Query_res.rows);
   
  }
  client.end();
});
}

const add_id_to_list_chat=(user_id,to_user)=>{
  const client = new Client({
    user: 'badroobot',
    host: 'badroobot.postgres.database.azure.com',
    database: 'badroobot',
    password: 'Anakillmesho9',
    ssl: true,
    port: 5432,
  });
  
  client.connect();
  const query = `
  SELECT *
        FROM chat_list
        WHERE chat_list_for_user = '${user_id}'
`;

client.query(query, (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result.rows);
    let all_chat_list=[{}];
    
    const new_chat_list_id= {"id":`${to_user}`};
    
    if(result.rowCount!=0){
      console.log(result.rows[0]["list_chats"]);
       all_chat_list = result.rows[0]["list_chats"];
       const tOrF=all_chat_list.some(item => item.id === new_chat_list_id.id);
       console.log(tOrF);
       if(!tOrF){
        all_chat_list.push(new_chat_list_id);
       }
       
       
       all_chat_list = JSON.stringify(all_chat_list);
    }else{
      all_chat_list=JSON.stringify([{"id":`${to_user}`}])
      console.log("ELSE");
    }
    
            //all_chat_list = all_chat_list ? JSON.parse(all_chat_list) : [];
           

            
           /* const query2 = {
              text: `INSERT INTO chat_list (list_chats, chat_list_for_user) VALUES ($1, $2);`,
              values: [all_chat_list, user_id],
            };
            */
            const query2 = {
              text: 'UPDATE chat_list SET list_chats = $1 WHERE chat_list_for_user = $2',
              values: [ all_chat_list,user_id],
            };
            client.query(query2, (err, result) => {
                if (err) {
                    console.log(err + " " + result);
                } else {
                  console.log({ message: 'list_chats added successfully' });
                }
            });
        }
    });
};


export const delete_list=(req,res)=>{   
  const client = new Client({
    user: 'badroobot',
    host:"badroobot.postgres.database.azure.com",
    database: 'badroobot',
    password: 'Anakillmesho9',
    ssl: true,
    port: 5432,
});
    client.connect();

    
      const { chat_id} = req.body; // assuming messageID is in the request body
    
      try {
      
         client.query('DELETE FROM chat_list WHERE chat_list_id = $1', [chat_id]);
        
    
        res.status(200).json({
          message: `message with id ${chat_id} has been deleted`,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({
          message: 'An error occurred while deleting the message',
        });
      }
   
 
    
};


export const add_data_to_chat_list_table =async(uID)=>{
 
  
  const client = new Client({
    user: 'badroobot',
    host:"badroobot.postgres.database.azure.com",
    database: 'badroobot',
    password: 'Anakillmesho9',
    ssl: true,
    port: 5432,
});
    client.connect();
   const all_chat_list=JSON.stringify([{"id":`${uID}`}])
    const query = {
      text: `INSERT INTO chat_list (list_chats, chat_list_for_user) VALUES ($1, $2);`,
      values: [all_chat_list,uID],
    };

client.query(query, (err, result) => {
  if (err) {
    console.log(err);
  } else {
  
    console.log("done");
     //res.status(200).send(result.rows);
      //all_chat_list = all_chat_list ? JSON.parse(all_chat_list) : [];
  } 
  });
};


export const for_test =async(req,res)=>{
 
  
  const client = new Client({
    user: 'badroobot',
    host:"badroobot.postgres.database.azure.com",
    database: 'badroobot',
    password: 'Anakillmesho9',
    ssl: true,
    port: 5432,
});
    client.connect();
  const query = `
  SELECT *
        FROM chat_list
        
`;

client.query(query, (err, result) => {
  if (err) {
    console.log(err);
  } else {
  
   
     res.status(200).send(result.rows);
      //all_chat_list = all_chat_list ? JSON.parse(all_chat_list) : [];
  } 
  });
};
