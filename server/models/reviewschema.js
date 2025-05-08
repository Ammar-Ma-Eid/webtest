
mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    bookId: String,
    body: String,
    rating: Number,
    author: String,
});

module.exports = mongoose.model('Review', reviewSchema);