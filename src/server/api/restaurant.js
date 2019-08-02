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

    app.post('/api/restaurant/addrestaurant', async function (req, res) {
        console.log('in restaurant addrestaurant');

        let restaurant = new RestaurantModel({
            name: req.body.name,
            location: req.body.location,
            thumbnail: req.body.thumbnail,
            thumbnailHeight: req.body.thumbnailHeight,
            thumbnailWidth: req.body.thumbnailWidth
        });

        try {
            await restaurant.save(function (err, restaurant) {
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
