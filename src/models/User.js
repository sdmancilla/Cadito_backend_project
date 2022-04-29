const mongoose = require('mongoose')
const Schema = require('../utils/conection')
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    name: {type: String},
    username: {type: String, required: true},
    password: {type: String, required: true},
    versionKey: false
})

// hash the password
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
  
// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema)