const express = require('express');
const router = express.Router({mergeParams : true}); //we have to do it here like this because our id is in the app.js folder and express router likes to keep params seperate. So to get access to that id we have to do it like this
const { reviewSchema } = require('../schemas.js');

const Campground = require('../models/campground'); 
const Review = require('../models/review');

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.post('/', validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });  // $pull is a mongoDB operator to remove from an array  
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`)
}))

module.exports = router;