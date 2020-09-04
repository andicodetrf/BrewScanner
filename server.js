//===== require all dependencies 

require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
// const stripe = require("stripe")(`${process.env.NODE_STRIPE_KEY}`)
const path = require("path")



//===== require all middleware
app.use(cors()) // allow all
require('./config/db'); //calls my mongoose connection to cleanup this file
app.use(express.json()) // allows me to receive JSON files from HEADER of REQUEST


//=== REQUEST
app.use('/api/items', require('./routes/item.route'))
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/transaction', require('./routes/transaction.route'))
app.use(express.static("runreact/build"))


//===== 404 errors
// app.get("*", (req,res) => {
//     res.status(404).json({message: "Page Not Found", code: "EB404"})
// })


app.get("/*", (req,res) => {
  res.sendfile(path.join(__dirname, "runreact/build/index.html"))
})




//===== setup server port
app.listen(process.env.PORT, 
    () => console.log(`running on ${process.env.PORT}`)
);



