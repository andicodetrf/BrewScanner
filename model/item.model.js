const mongoose = require('mongoose');


const itemSchema = new mongoose.Schema({
    itemName: String,
    itemPrice: String,
    itemUnit: String,
    itemImgURL: String,
    itemFrom: String,
    itemOriURL: String,
    itemID: String,
    itemQty: String
}, {timestamps: true})


const Item = mongoose.model('Item', itemSchema)

module.exports = Item;