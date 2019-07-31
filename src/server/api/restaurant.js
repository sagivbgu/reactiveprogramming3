let RestaurantModel = require('../model/restaurant');
let ReviewModel = require('../model/review');

module.exports = (app) => {
    app.get('/api/restaurants/fetchall', async function (req, res) {
        console.log('inside /api/restaurants/fetchall');

        let restaurants = await RestaurantModel.find({});
        restaurants = await Promise.all(restaurants.map(async restaurant => {
            return {
                _id: restaurant._id,
                name: restaurant.name,
                location: restaurant.location,
                thumbnail: restaurant.thumbnail,
                thumbnailWidth: restaurant.thumbnailWidth,
                thumbnailHeight: restaurant.thumbnailHeight,
                reviews: await ReviewModel.find({"restaurantId": restaurant._id})
            };
        }));

        res.json(restaurants);
    });
};
