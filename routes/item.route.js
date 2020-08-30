const router = require('express').Router();
const Item = require('../model/item.model');
const checkToken = require("../config/config")
const Axios = require('axios')
const cheerio = require("cheerio")

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

router.get('/', checkToken, async(req,response) => {

    //this req.user defined from config
    // console.log(req.user)
    try{
        // let items = await Item.find()
        // let item = new Item(req.body);
        // // if(item.name)
        // let savedItem = await item.save()
        
        Axios.get("https://www.fairprice.com.sg/category/beer")
        .then((res) => {
            // console.log(res.data);
            let $ = cheerio.load(res.data);
            let x = $(".product-container"); //ntuc
      
            // console.log("length of received products", x.length);
            
            let ntucPrices = []
            let ntucNames = []
            let ntucPackagings = []
            let ntucImgURLs = []
            let ntucProductURLs = []

            let items = []

            for (let i = 0; i < x.length; i++) {

                    //FOR PRODUCT NAME PATH
                    // if(x[i].children[0].children[0].children[2]){
                    // console.log(x[i].children[0].children[0].children[2].children[1].children[0]
                    //     .children[0]
                    //     .data)
                    // }

                    // //PRODUXT URL PATHWAY
                    // if(x[i].children[0].children[0].children[2]){
                    // console.log(x[i].children[0].attribs.href)
                    // }
                    
                    //checkIMGPATH
                    // console.log(x[i].children[0].children[0].children[1].children[0].children[0].attribs["data-src"])

                    if(x[i].children[0].children[0].children[2]){
                    // price
                        ntucPrices.push(x[i]

                        .children[0]
                        .children[0]
                        .children[2]
                        .children[0]
                        .children[0]
                        .children[0]
                        .children[0]
                        .children[0]
                        .data.slice(1)
                    )


                    ntucNames.push(x[i]
                        
                        .children[0]
                        .children[0]
                        .children[2]
                        .children[1]
                        .children[0]
                        .children[0]
                        .data
                    )


                    ntucPackagings.push(x[i]
                    
                        .children[0]
                        .children[0]
                        .children[2]
                        .children[1]
                        .children[1]
                        .children[0]
                        .children[0]
                        .children[0]
                        .data
                    )

                    ntucProductURLs.push(x[i]
                    
                        .children[0]
                        .attribs
                        .href
                    )

                    ntucImgURLs.push(x[i]

                        .children[0]
                        .children[0]
                        .children[1]
                        .children[0]
                        .children[0]
                        .attribs["data-src"]
                    )

                    
                    }

             }

            for (let i = 0; i < ntucNames.length; i++){
                let item = {
                    itemName: ntucNames[i],
                    itemUnit: ntucPackagings[i],
                    itemPrice: ntucPrices[i],
                    itemImgURL: ntucImgURLs[i],
                    itemFrom: "FairPrice",
                    itemOriURL: `https://www.fairprice.com.sg${ntucProductURLs[i]}`,
                    itemID: ntucProductURLs[i].substring(9)
                }

                items.push(item)
            }

            // console.log(ntucShop)
            // console.log(ntucPrices)
            // console.log(ntucImgURLs)
            // console.log(ntucNames)
            // console.log(ntucPackagings)
            // console.log(ntucProductURLs)
        

        // Axios.get("https://coldstorage.com.sg/meat-seafood")
        Axios.get("https://coldstorage.com.sg/beers-wines-spirits/beer-cider")
            .then((resCS) => {
                    // get
                    let $ = cheerio.load(resCS.data);
                    //returns an object of objects of the first some number loaded items
                    let y = $(".product_box");
                    let productImg = $(".product_images");
                    let productName = $(".product_name");
                    let productPrice = $(".price_normal");
                    let productURL = $(".product_box");
                    let productBrand = $(".product_category_name");
                    

                    let csPrices = []
                    let csNames = []
                    let csImgURLs = []
                    let csProductURLs = []

                    
                    // console.log(productImg[29].children[0].next.children[0].next.children[0].next.attribs.src)

                     // console.log(productURL[0].children[1].attribs.href)
                    // console.log(productBrand[0].children[0].children[0].data) //product brand
                    // console.log(productName[0].children[0].data.trim())
                    // console.log(productBrand[0].children[0].next.attribs.class) //product brand
                    // console.log(productBrand[0].children[0].next.children[0].children[0].data)
                    // console.log(productBrand.length)
                    
                    
                    for (let i = 0; i < y.length; i++) {
                        
                        if(productBrand[i].children[0].next.attribs.class === 'category-name'){
                            csNames.push(
                            
                                `${productBrand[i].children[0].next.children[0].children[0].data} ${productName[i].children[0].data.trim()}`
                            );
                        }else{
                            csNames.push(
                                productName[i]
                                .children[0]
                                .data.trim()
                                
                            )
                        }

                        csPrices.push(productPrice[i]
                            .children[0]
                            .data.slice(1)
                        );
                        csImgURLs.push(productImg[i]
                            .children[0]
                            .next.children[0]
                            .next.children[0]
                            .next.attribs
                            .src
                        );
                        csProductURLs.push(productURL[i]
                            .children[1]
                            .attribs
                            .href
                        );
                        




                    }
                console.log(csNames);
                console.log(csPrices.length);
                console.log(csImgURLs.length);
                console.log(csProductURLs.length);


                
                // let obj = []
            
                let splitspace = csNames.map((a) => a.split(' '))
                for(let i =0; i < splitspace.length; i++){
                //     console.log(splitspace[i].length)
                    
                    let lastword = splitspace[i][(splitspace[i].length-1)]
                    if(parseInt(lastword[0])>0){
                        let item1 = {
                            itemName: splitspace[i].slice(0,[(splitspace[i].length-1)]).join(' '),
                            itemUnit: lastword,
                            itemPrice: csPrices[i],
                            itemImgURL: csImgURLs[i],
                            itemFrom: 'Cold Storage',
                            itemOriURL: `https://coldstorage.com.sg${csProductURLs[i]}`,
                            itemID: csProductURLs[i].substring(1)
                        }
                
                        items.push(item1)
                    } else {
                        let item2 = {
                                    itemName: splitspace[i].join(' '),
                                    itemUnit: 'NA',
                                    itemPrice: csPrices[i],
                                    itemImgURL: csImgURLs[i],
                                    itemFrom: 'Cold Storage',
                                    itemOriURL: `https://coldstorage.com.sg${csProductURLs[i]}`,
                                    itemID: csProductURLs[i]
                                }
                        items.push(item2)
                    }
                
                }
            
                console.log(items)

                response.status(200).json({
                    count: items.length,
                    message: 'get all Items Success',
                    items, 
                })
            
            })

    })
        
        // .catch((err) => {
        //     console.log(err);
        // });

      
    }catch(err){
        res.status(500).json({
            message: "Error: cannot get all items",
            statuscode: "EB500"
        })
    }
})

module.exports = router;