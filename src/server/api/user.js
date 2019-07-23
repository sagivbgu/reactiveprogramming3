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
        UserModel
            .findOne({username: req.body.username})
            .then(doc => {
                console.log('req=' + req);
                if (doc != null) {
                    console.log('user found=', req.body.username);
                    // TODO: Send error message
                    res.json({success: false, error: 'User already exists'});
                } else {
                    console.log('new user=', req.body.username);
                    // TODO: Add user to DB
                    // new Buffer(req.body.photo.photo, 'base64');
                    /*
                    EXAMPLE:

                    var a = new A;
                    a.img.data = fs.readFileSync(imgPath);
                    a.img.contentType = 'image/png';
                    a.save(function (err, a) {
                        if (err) throw err;
                        */
                    res.json({success: true});
                }
            })
    });
};
