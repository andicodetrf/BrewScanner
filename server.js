//===== require all dependencies 

require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const cheerio = require("cheerio")
const Axios = require('axios')
// const { createProxyMiddleware } = require('http-proxy-middleware');
// const puppeteer = require('puppeteer')



//===== require all middleware
app.use(cors()) // allow all
require('./config/db'); //calls my mongoose connection to cleanup this file
app.use(express.json()) // allows me to receive JSON files from HEADER of REQUEST


//=== REQUEST
app.use('/api/items', require('./routes/item.route'))
app.use('/api/auth', require('./routes/auth.route'))

// app.get('/sp', async (req,res) => {
//     try{
//         let spAlc = "https://shopee.sg/Alcoholic-Beverages-cat.169.14255"
//         let browser = await puppeteer.launch();
//         let page = await browser.newPage();
//         // [class="_1NoI8_ _1JBBaM"], { waitUntil: 'networkidle2'}
//         await page.goto(spAlc); await page.waitFor('div[class="_1NoI8_ _1JBBaM"]')


//         let data = await page.evaluate(()=> {
//             let body = document.querySelectorAll('div[class="_1NoI8_ _1JBBaM"]').innerHTML
//             return body

//             // document.querySelectorAll('div[class="_1NoI8_ _1JBBaM"]')

//         })
//         // let data = await page.evaluate( async() => {
//         //     let itemNameArr = await [...document.querySelectorAll('div')]
//         //     console.log('HERE', itemNameArr)

//         //     // const allNames = itemNameArr.map((item) => {
//         //     //     item.innerText
//         //     // })


//         //     // let itemPrice = document.querySelector('div[class="_1w9jLI _37ge-4 _2ZYSiu"]').innerText

//         //     return {
//         //         itemNameArr
//         //         // allNames,
//         //         // itemPrice
//         //     }
//         // })

//         console.log(data)

        
//         // console.log('test')

//         // debugger;
//         res.status(200).json({
//             data
//         })
//         await browser.close()
//     } catch (err){
//         console.log(err)
//     } 

// })


// app.use('/Alcoholic-Beverages-cat.169.14255', createProxyMiddleware({ target: 'https://shopee.sg', changeOrigin: true }));

// // axios.get("https://shopee.sg/Alcoholic-Beverages-cat.169.14255")
// axios.get('/Alcoholic-Beverages-cat.169.14255')
//     .then(resp => {
//         console.log(resp.data)
//         // get
//         // let $ = cheerio.load(resp.data);
//         //returns an object of objects of the first some number loaded items
//         // let x = $(".shopee-search-item-result__items"); 
//         // console.log("length of received products", x.length);
//     })
//     .catch(err => console.log(err))


// Axios.get("https://coldstorage.com.sg/meat-seafood")
//                         .then(resp => {
//                             // get
//                             let $ = cheerio.load(resp.data);
//                             //returns an object of objects of the first some number loaded items
//                             let productName = $(".product_name");
//                             let productPrices = $(".price_normal");
//                             // let productDesc = $(".product_desx");
//                             // console.log(productDesc);
//                             // console.log("length of received products", x.length);
//                             let names = [];
//                             let prices = [];
//                             for (let i = 0; i < productName.length; i++) {
//                                 names.push(productName[i]
//                                     .children[0]
//                                     .data.trim()
//                                 );
//                                 prices.push(productPrices[i]
//                                     .children[0]
//                                     .data
//                                 );
//                             }
//                             console.log(names);
//                             console.log(prices);

//                             })
//                             .catch((err) => {
//                                 console.log(err);
//                               });


    // Axios.get("https://coldstorage.com.sg/beers-wines-spirits/beer-cider")
    //         .then((resCS) => {
    //                 // get
    //                 let $ = cheerio.load(resCS.data);
    //                 //returns an object of objects of the first some number loaded items
    //                 let y = $(".product_box");
    //                 let productImg = $(".product_images");
    //                 let productName = $(".product_name");
    //                 let productPrice = $(".price_normal");
    //                 let productURL = $(".product_box");
                    

    //                 let csPrices = []
    //                 let csNames = []
    //                 let csImgURLs = []
    //                 let csProductURLs = []

                    
    //                 // console.log(productImg[29].children[0].next.children[0].next.children[0].next.attribs.src)

    //                 // console.log(productURL[0].children[1].attribs.href)
                    
                    
    //                 for (let i = 0; i < y.length; i++) {
                        
    //                     // check.push(y[i].children[0].children[0].children[0].children[0].children[0].src)

    //                     csNames.push(productName[i]
    //                         .children[0]
    //                         .data.trim()
    //                     );
    //                     csPrices.push(productPrice[i]
    //                         .children[0]
    //                         .data.slice(1)
    //                     );
    //                     csImgURLs.push(productImg[i]
    //                         .children[0]
    //                         .next.children[0]
    //                         .next.children[0]
    //                         .next.attribs
    //                         .src
    //                     );
    //                     csProductURLs.push(productURL[i]
    //                         .children[1]
    //                         .attribs
    //                         .href
    //                     );



    //                 }
    //         console.log(csNames);
    //         console.log(csPrices.length);
    //         console.log(csImgURLs.length);
    //         console.log(csProductURLs.length);


    //         //numStarts
    //         let obj = [

    //         ]
         
    //         let splitspace = csNames.map((a) => a.split(' '))
    //         for(let i =0; i < splitspace.length; i++){
    //         //     console.log(splitspace[i].length)
                
    //             let lastword = splitspace[i][(splitspace[i].length-1)]
    //             if(parseInt(lastword[0])>0){
    //                 let item1 = {
    //                     itemName: splitspace[i].slice(0,[(splitspace[i].length-1)]).join(' '),
    //                     itemUnit: lastword,
    //                     itemPrice: csPrices[i],
    //                     itemImgURL: csImgURLs[i],
    //                     itemOriURL: `https://coldstorage.com.sg${csProductURLs[i]}`,
    //                 }
            
    //                 obj.push(item1)
    //             } else {
    //                 let item2 = {
    //                             itemName: splitspace[i].join(' '),
    //                             itemUnit: 'NA',
    //                             itemPrice: csPrices[i],
    //                             itemImgURL: csImgURLs[i],
    //                             itemOriURL: `https://coldstorage.com.sg${csProductURLs[i]}`,
    //                         }
    //                 obj.push(item2)
    //             }
            
                    
    //         }
            
    //         console.log(obj)



    //         // response.status(200).json({
    //         //     // count: items.length,
    //         //     message: 'get all Items Success',
    //         //     items, 
    //         //     // names,
    //         //     // prices
    //         })
        

//===== 404 errors
app.get("*", (req,res) => {
    res.status(404).json({message: "Page Not Found", code: "EB404"})
})


//===== setup server port
app.listen(process.env.PORT, 
    () => console.log(`running on ${process.env.PORT}`)
);


