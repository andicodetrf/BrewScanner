const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
          orders: [
                      { itemName: String, 
                        itemQty: Number, 
                        itemOrigin: String, 
                        itemPrice: Number
                      }
                  ], 

          orderTotal: Number,

          isPaid: {
            type: Boolean,
            default: false
          },  
          // orderStatus: {
          //   type: Boolean,
          //   default: false
          // },  
          // purchasedBy: {
          //   type: mongoose.Schema.Types.ObjectId,
          //   ref: "User"
          // },
          transactionUserID: String
          
}, {timestamps: true})


const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction;