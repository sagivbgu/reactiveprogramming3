let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: String,
    photo: {data: Buffer, contentType: String},
    location: String // TODO: Or reference from Locations collection?
});

module.exports = mongoose.model('UserModel', userSchema);
