let RestaurantModel = require('../model/restaurant');

module.exports = (app) => {
    app.get('/api/restaurants/fetchall', function (req, res) {
        console.log('inside /api/restaurants/fetchall');
        RestaurantModel.find({})
            .map(restaurants   => {
                // TODO: Weird map
                return restaurants.map(restaurant => {
                    return {
                        src: restaurant.thumbnailLink,
                        thumbnail: restaurant.thumbnailLink,
                        thumbnailWidth: restaurant.thumbnailWidth,
                        thumbnailHeight: restaurant.thumbnailHeight,
                        thumbnailCaption: restaurant.name,
                        name: restaurant.name,
                        location: restaurant.location
                    }
                })
            })
            .then(doc => {
                res.json(doc)
            });
    });
};