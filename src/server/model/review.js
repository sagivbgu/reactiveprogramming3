let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let reviewSchema = new Schema({
    restaurantId: String,
    reviewerUsername: String,
    text: String,
    date: Date,
    ratings: {
        type: Map,
        of: Number
    }

    // TODO:
    // pictures: ??
});

module.exports = mongoose.model('ReviewModel', reviewSchema);
