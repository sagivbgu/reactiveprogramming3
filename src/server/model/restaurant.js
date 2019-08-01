let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let restaurantSchema = new Schema({
    name: String,
    location: String,
    thumbnail: String,
    thumbnailWidth: Number,
    thumbnailHeight: Number
});

module.exports = mongoose.model('RestaurantModel', restaurantSchema);
