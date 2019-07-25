let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let restaurantSchema = new Schema({
    name: String,
    location: String,
    thumbnailLink: String,
    thumbnailWidth: Number,
    thumbnailHeight: Number,
    // TODO: Reviews
});

module.exports = mongoose.model('RestaurantModel', restaurantSchema);
