const mongoose = require('mongoose');


const bookschema = mongoose.Schema({
    bookid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
   
})

module.exports = mongoose.model('Book', bookschema);
