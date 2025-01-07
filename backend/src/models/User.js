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
userSchema.methods.comparePassword = async function (plainText) {
   try {
     return await bcrypt.compare(plainText, this.password);
   } catch (err) {
     throw err;
   }
};


module.exports = mongoose.model('User', userSchema);