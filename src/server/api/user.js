let UserModel = require('../model/user');
let ReviewModel = require('../model/review');
let RestaurantModel = require('../model/restaurant');

function getJson(userDoc) {
    return {
        username: userDoc.username,
        location: userDoc.location,
        photo: {
            data: userDoc.photo.data.toString(),
            contentType: userDoc.photo.contentType
        }
    }
}

module.exports = (app) => {
    app.post('/api/user/registration', function (req, res) {
        console.log('in user registration');
        UserModel.findOne({username: req.body.username})
            .then(doc => {
                if (doc != null) {
                    console.log('user found=', req.body.username);
                    res.json({success: false, error: `User ${req.body.username} already exists`});
                } else {
                    let {username, location} = req.body;
                    console.log('new user=', req.body.username);
                    let newUser = new UserModel({
                        username,
                        location,
                        photo: {
                            data: new Buffer.from(req.body.photo.photo),
                            contentType: req.body.photo.contentType
                        },
                    });
                    newUser.save(function (err, newUser) {
                        err ? res.json({success: false, error: err}) : res.json({success: true});
                    });
                }
            })
    });

    app.get('/api/user/exists', function (req, res) {
        console.log('inside /api/user/exists');
        let username = req.query.username;
        UserModel.findOne({username: username})
            .then(doc => {
                res.json({username: username, exists: doc != null});
            });
    });

    app.get('/api/user/profile', function (req, res) {
        console.log('inside /api/user/profile');
        let username = req.query.username;
        UserModel.findOne({username: username})
            .then(doc => {
                if (doc == null) {
                    res.json({error: `User ${req.body.username} doesn't exist`})
                } else {
                    let docJson = getJson(doc);
                    ReviewModel.find({reviewerUsername: username})
                        .then(reviews => {
                                addRestaurantNamesToReviews(reviews).then(
                                    (reviews) => {
                                        docJson.reviews = reviews;
                                        res.json(docJson)
                                    }
                                );
                            }
                        );
                }
            });
    });

    app.post('/api/user/profile/update', function (req, res) {
        console.log('in user update profile');
        UserModel.findOne({username: req.body.username})
            .then(doc => {
                const oldUsername = req.body.username;
                if (doc == null) {
                    console.log('user not found: ', oldUsername);
                    res.json({error: `User ${oldUsername} does not exist`});
                } else {
                    let newUsername = req.body.profile.username;
                    UserModel.findOne({username: newUsername})
                        .then(duplicatedUserDoc => {
                            if (newUsername !== oldUsername && duplicatedUserDoc != null) {
                                res.json({error: `User ${newUsername} already exists`});
                            } else {
                                console.log('updating user: ', oldUsername);
                                doc.username = newUsername;
                                doc.location = req.body.profile.location;
                                doc.photo.data = new Buffer.from(req.body.profile.photo.photo);
                                doc.photo.contentType = req.body.profile.photo.contentType;

                                doc.save(function (err, doc) {
                                    err ? res.json({error: err}) : res.json(getJson(doc));
                                });
                            }
                        });
                }
            })
    });

    app.get('/api/user/search', function (req, res) {
        console.log('inside /api/user/search');
        let query = req.query.query;
        searchUser(query)
            .then(results => res.json(results))
            .catch(error => res.json({error: error.message}));
    });
};

async function searchUser(query) {
    const searchByUsername = () => UserModel.find({username: query}).exec();
    const searchByLocation = () => UserModel.find({location: query}).exec();

    [usernameSearchResult, locationSearchResult] = await Promise.all([searchByUsername(), searchByLocation()]);
    return usernameSearchResult.map(doc => doc.username).concat(locationSearchResult.map(doc => doc.username));
}

async function addRestaurantNamesToReviews(reviews) {
    return await Promise.all(reviews.map(
        async (review) => {
            let restaurantDoc = await RestaurantModel.findById(review.restaurantId);
            review._doc.restaurantName = restaurantDoc.name;
            return review;
        })
    );
}