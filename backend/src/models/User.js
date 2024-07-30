const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', function(next){
    if(!this.isModified()) {
        return next()
    }
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

// Compare password function
userSchema.methods.comparePassword = function(plainText, callback){
    return callback(null, bcrypt.compareSync(plainText, this.password))
}


module.exports = mongoose.model('User', userSchema);