const mongoose = require('mongoose');
let ReviewModel = require('../model/review');
let RestaurantModel = require('../model/restaurant');

module.exports = (app) => {
    app.post('/api/restaurant/addreview', async function (req, res) {
        console.log('in restaurant addreview');

        let review = new ReviewModel({
            restaurantId: req.body.restaurantId,
            reviewerUsername: req.body.reviewerUsername,
            text: req.body.text,
            date: req.body.date,
            ratings: req.body.ratings
        });

        try {
            await review.save(function (err, review) {
                if (err) {
                    throw err;
                } else {
                }
            });

            res.json({success: true});
        } catch (error) {
            res.json({success: false, error: err})
        }
    });
};

