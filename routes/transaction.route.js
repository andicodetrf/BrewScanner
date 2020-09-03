const router = require('express').Router();
const Transaction = require('../model/transaction.model');
const checkToken = require("../config/config")
const Axios = require('axios');
const User = require('../model/user.model');

//POST INTO TRANSACTION MODEL
router.post('/', checkToken, async(req,res) => {
    try{

        let newTransact = new Transaction(req.body)

        newTransact.transactionUserID = req.user.id
        newTransact.isPaid = true

        let saveTransact = await newTransact.save()

        res.status(201).json({
            message: "transaction created",
            saveTransact
        });

    }catch(err){
        res.status(500).json({
            message: "fail to save transaction",
            statuscode: "EB500"
        })
    }
})


//GET USER
router.get("/", checkToken, async (req, res) => {

    try {
    //   let user = await User.findById(req.user.id)
    
    let transactHistory = await Transaction.find()
        // console.log(transactHistory)

        let finalT = transactHistory.filter(el => el.transactionUserID === req.user.id)

        console.log(finalT)
    
    // let user = await User.findById(req.user.id).populate("hasPurchased") 
    // console.log(user)

      res.status(200).json({
          message: "transaction history",
          finalT
      });
    } catch (error) {
      res.status(500).json({
        message: "something is wrong!",
      });
    }
  });






module.exports = router;