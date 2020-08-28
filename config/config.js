const jwt = require("jsonwebtoken")
require('dotenv').config()
//export anonymous function
//next means continue the code
module.exports = (req, res, next) => {
    const token = req.header("x-auth-token");

    //MUST USE 401 COZ IT MEANS UNAUTHORIZED
    if(!token){
        return res.status(401).json({
            message: 'are you a thief!'
        })
    }

    //if that user has token, verify and check token if its the same token sent by me
    //STORE THE SECRET SEIFEWDAYSTOGO IN DOTENV FILE
    try{
        const decoded=jwt.verify(token, process.env.SECRET)

        req.user = decoded.user; 
        //this must be the same as payload 'user' variable. if you use 'ebere' there, then you must use decoded.ebere

        next();

    }catch(err){
        return res.status(401).json({
            message: 'token not valid'
        })
    }


}