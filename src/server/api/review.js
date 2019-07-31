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

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            let reviewId = '';

            await review.save(function (err, review) {
                if (err) {
                    throw err;
                } else {
                    reviewId = review._id;
                }
            });

            await RestaurantModel.findOneAndUpdate(
                {"_id": req.body.restaurantId},
                {
                    $push: {
                        reviewsIds: {
                            $each: [review._id],
                            $position: 0
                        }
                    }
                }
            );

            res.json({success: true});
        } catch (error) {
            res.json({success: false, error: err})
        }

        session.commitTransaction();
        session.endSession();
    });

    app.post('/api/restaurants/getrestaurantreviews', function (req, res) {
        console.log('in restaurant getrestaurantreviews');

        ReviewModel.find({restaurantId: req.body.restaurantId})
            .then(doc => {
                res.json(doc);
            });
    });
};

