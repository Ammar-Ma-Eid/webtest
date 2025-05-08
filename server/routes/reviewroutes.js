const express = require('express');
const Router = express.Router();
const Review = require('../models/reviewschema');

// GET /api/reviews: Returns all reviews
Router.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/reviews: Submits a review for a book
Router.post('/reviews', async (req, res) => {
    const review = new Review({
        bookId: req.body.bookId,
        body: req.body.comment,
        rating: req.body.rating,
        author: req.body.reviewer
    });

    try {
        const savedReview = await review.save();
        res.status(201).json(savedReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = Router;
