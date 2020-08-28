const router = require('express').Router();
const Item = require('../model/item.model');
const checkToken = require("../config/config")

router.get('/:id', async(req,res) => {
    try{
        let item = await Item.findById(req.params.id)
        res.status(200).json({
            message: "item found",
            item,
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: 'failed to retrieve item',
            statuscode: 'EB500'
        })
    }

})
/*
@route GET api/items/:id
@desc Gets one items
@access public
*/


// router.put('/:id', async(req,res) => {
//     try{
//         let item = await Item.findByIdAndUpdate(req.params.id, req.body)

//         if(item){
//             res.status(200).json({
//                 message: "nothing spoil"
//             })
//         }
//     }catch(err){
//         res.status(500).json(
//             {message: 'ok already or not',
//             }
//         )
//     }
// })
/*
@route PUT api/item/:id
@desc updates one item
@access public
*/

// router.delete('/:id', async(req,res) => {
//     try{
//         let itemDelete = await Item.findByIdAndDelete(req.params.id);

//         if(itemDelete){
//             res.status(200).json({
//                 message: "U don comot am!"
//             })
//         }

//     }catch(error){
//         res.status(500).json({
//             message: "fail in chinese",
//             statuscode: "EB500"
//         })   
//     }
// })
/*
@route delete api/item/:id
@desc deletes one item
@access public
*/


router.post('/',  async(req,res) => {
    try{
        // let items = await Item.find()
        let item = new Item(req.body);
        
        // if(item.name)
        let savedItem = await item.save()

        res.status(201).json({
            message: "chen gong"
        });


        // res.status(200).json({
        //     count: items.length,
        //     items,
        // })
    }catch(err){
        res.status(500).json({
            message: "fail in chinese",
            statuscode: "EB500"
        })
    }
})
/*
@route GET api/items
@desc Gets all items
@access public
*/


router.get('/', checkToken, async(req,res) => {

    //this req.user defined from config
    // console.log(req.user)
    try{
        let items = await Item.find()
        // let item = new Item(req.body);
        
        // // if(item.name)
        // let savedItem = await item.save()

        res.status(200).json({
            count: items.length,
            items,
        })
    }catch(err){
        res.status(500).json({
            message: "Error: cannot get all items",
            statuscode: "EB500"
        })
    }
})

module.exports = router;