const router = require('express').Router();
const Transaction = require('../model/transaction.model');
const checkToken = require("../config/config")
const Axios = require('axios')

//POST INTO TRANSACTION MODEL

router.post('/transaction',  async(req,res) => {
    try{
        // let items = await Item.find()
        let { order } = req.body

        let newTransact = new Transaction(order)

        // if(item.name)
        let saveTransact = await newTransact.save()

        res.status(201).json({
            message: "chen gong",
            saveTransact
        });

        // res.status(200).json({
        //     count: items.length,
        //     items,
        // })
    }catch(err){
        res.status(500).json({
            message: "fail to save transaction",
            statuscode: "EB500"
        })
    }
})




module.exports = router;