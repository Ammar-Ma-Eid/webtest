const express =require('express');
const mongoose=require('mongoose');
const app=express();
const userRoutes=require('./routes/userRoutes.js');

mongoose.connect('mongodb+srv://rowan66:rowanrowan@cluster0.syroqgv.mongodb.net/Database')
.then(()=>console.log("Database Connected"))
.catch((error)=> console.log("error"))


app.use(express.json());

app.use('/',userRoutes);

app.listen (5000,()=>console.log('server is running on port 5000'));