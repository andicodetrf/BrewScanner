const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
        orders: [
                    { itemName: "", 
                      qty: "", 
                      origin: "url", 
                      price: "price"
                    }
                ], 
          total: 0, 
          paid: false,
          status: false, //for open or closed
}, {timestamps: true})


const User = mongoose.model('User', userSchema)

module.exports = User;