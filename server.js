//===== require all dependencies 

require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const stripe = require("stripe")(`${process.env.NODE_STRIPE_KEY}`)
const { v4: uuidv4 } = require('uuid');
// const cheerio = require("cheerio")
// const Axios = require('axios')
// const { createProxyMiddleware } = require('http-proxy-middleware');
// const puppeteer = require('puppeteer')


//===== require all middleware
app.use(cors()) // allow all
require('./config/db'); //calls my mongoose connection to cleanup this file
app.use(express.json()) // allows me to receive JSON files from HEADER of REQUEST


//=== REQUEST
app.use('/api/items', require('./routes/item.route'))
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/transaction', require('./routes/transaction.route'))


// const paymentIntent = await stripe.paymentIntents.create({
//     amount: 1099,
//     currency: 'sgd',
//     // Verify your integration in this guide by including this parameter
//     metadata: {integration_check: 'accept_a_payment'},
//   });



app.post('/api/checkout', async (req,res) => {
    console.log("Request", req.body)

    let error;
    let status;

    try{
        const { order, totalCost, token } = req.body

        const customer = await 
        stripe.customers.create({
            email: token.email,
            source: token.id
        });

        let idempotency_key = uuidv4()
        const charge = await stripe.charges.create({
            amount: totalCost*100,
            currency: "sgd",
            country: "Singapore",
            customer: customer.id,
            receipt_email: token.email, 
            description: order,
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip
                }
            }

        },
        {
            idempotency_key
        }
        
    );
    console.log("Charge:", {charge});
    status = "success";
    
    }catch(err){
        console.log("Error:", err)
        status = "failure";
    }

    res.json({error, status})
});




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


        // Axios.get("https://redmart.lazada.sg/shop-groceries-wines-beers-spirits-beer/?spm=a2o42.lazmart_channel.nav_category_tree.160.447b48a6JXGID6&scm=1003.4.icms-zebra-100648641-4240157.OTHER_6017481070_3893702&m=redmart")
        // Axios.get('https://shopee.sg/Alcoholic-Beverages-cat.169.14255')
        // .then((res) => {
        //     console.log(res.data);
        //     let $ = cheerio.load(res.data);
        //     let x = $("#root"); 
        //     console.log(x._root[0].children[1].children[2].children[25].next.children)
        //     console.log(x)
        // })

        // Axios.get("https://redmart.lazada.sg/shop-groceries-wines-beers-spirits-beer/?spm=a2o42.lazmart_channel.nav_category_tree.160.447b48a6JXGID6&scm=1003.4.icms-zebra-100648641-4240157.OTHER_6017481070_3893702&m=redmart")
        // Axios.get('https://shopee.sg/Alcoholic-Beverages-cat.169.14255')
        // .then((res) => {
        //     console.log(res.data);
        //     // let $ = cheerio.load(res.data);
        //     // let x = $("#root"); 
        //     // console.log(x._root[0].children[1].children[2].children[25].next.children)
        //     // console.log(x)
        // })
      




//===== 404 errors
app.get("*", (req,res) => {
    res.status(404).json({message: "Page Not Found", code: "EB404"})
})


//===== setup server port
app.listen(process.env.PORT, 
    () => console.log(`running on ${process.env.PORT}`)
);



