let axios = require('axios');
let UserModel = require('../model/user');

/*async function getImages(tag) {
  const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=100&format=json&safe_search=1&nojsoncallback=1`;
  const baseUrl = 'https://api.flickr.com/';
  return await axios({
    url: getImagesUrl,
    baseURL: baseUrl,
    method: 'GET'
  })
}*/

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
                            data: new Buffer(req.body.photo.photo, 'base64'),
                            contentType: req.body.photo.contentType
                        },
                    });
                    newUser.save(function (err, newUser) {
                        if (err) {
                            res.json({success: false, error: err})
                        } else {
                            res.json({success: true});
                        }
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
};
