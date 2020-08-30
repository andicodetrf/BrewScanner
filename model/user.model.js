const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    birthDate: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
      },
    isUser: {
        type: Boolean,
        default: true
    },  
    hasPurchased: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction"
    },
    favorites: [{
        favItem: String,
        favItemPrice: Number,
    }],

}, {timestamps: true})


const User = mongoose.model('User', userSchema)

module.exports = User;