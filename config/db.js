require('dotenv').config()

const mongoose = require("mongoose")

//===conect to mongoose
mongoose.connect(
    process.env.MONGODBLIVE,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
        
    }, 
    (err) => {
        if(err) throw err; //if err, catch it, if not, execute the next line
        console.log("mongoose connected!")
    }
)

module.exports = mongoose
