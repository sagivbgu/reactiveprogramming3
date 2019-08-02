let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: String,
    photo: {data: Buffer, contentType: String},
    location: String
});

module.exports = mongoose.model('UserModel', userSchema);
