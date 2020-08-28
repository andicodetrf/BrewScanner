const mongoose = require('mongoose');


const itemSchema = new mongoose.Schema({
    itemName: String,
    price: String,
    origin: String,
    qty: String
}, {timestamps: true})


const Item = mongoose.model('Item', itemSchema)

module.exports = Item;