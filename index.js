import express from 'express';
import bodyParser from 'body-parser';

import usersRoutes from './routes/users.js';


const app =express();
const PORT=process.env.PORT||5000;
app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
res.setHeader('Access-Control-Allow-Headers',"Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(bodyParser.json());

app.use('/',usersRoutes);
app.use('/d',(req,res)=>{
    res.status(201).json({ message: 'Post added successfully' });
});



app.listen(PORT,()=> console.log(`Server running on port: http://localhost:${PORT}`))
