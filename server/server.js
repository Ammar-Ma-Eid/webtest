const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookroutes = require('./routes/bookroutes');
const reviewroutes = require('./routes/reviewroutes');

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3001', // React app will run on port 3001
    credentials: true
}));

app.use(express.json());

// MongoDB connection with detailed error handling
console.log('Attempting to connect to MongoDB...');

// Try connecting to MongoDB Atlas with direct connection string
mongoose.connect('mongodb+srv://ammar:ammar@cluster0.xnxcfq3.mongodb.net/books?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('Successfully connected to MongoDB Atlas with direct connection');
}).catch((err) => {
    console.log('Could not connect to MongoDB Atlas with direct connection:', err.message);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});



app.use('/api', bookroutes);
app.use('/api', reviewroutes);



app.listen(3000, () => {
    console.log('Server started on port 3000');
});