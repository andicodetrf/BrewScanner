//===== require all dependencies 

require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')


//===== require all middleware
app.use(cors()) // allow all
require('./config/db'); //calls my mongoose connection to cleanup this file
app.use(express.json()) // allows me to receive JSON files from HEADER of REQUEST


//=== REQUEST
app.use('/api/items', require('./routes/item.route'))
app.use('/api/auth', require('./routes/auth.route'))



//===== 404 errors
app.get("*", (req,res) => {
    res.status(404).json({message: "Page Not Found", code: "EB404"})
})


//===== setup server port
app.listen(process.env.PORT, 
    () => console.log(`running on ${process.env.PORT}`)
);


