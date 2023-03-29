const mongoose = require('mongoose');
const validator = require('validator');
const bycrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxlength: [30, 'Name should not exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email address'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password minimum length is 6 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpiry: Date
})

// Password encrption before saving
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next()
    }

    this.password = await bycrpt.hash(this.password, 10)
})
// Return JWT Token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY_TIME
    })
}

// compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bycrpt.compare(enteredPassword, this.password)
}

// generating reset token
userSchema.methods.getResetPasswordToken = function() {
    // generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // hash and set to reset password.
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // set token expiry
    this.resetPasswordExpiry = Date.now() + 30 * 60 * 1000;

    return resetToken
}
module.exports = mongoose.model("User", userSchema);