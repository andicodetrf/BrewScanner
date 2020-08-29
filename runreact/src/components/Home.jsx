import React, { Component } from 'react'
import Axios from 'axios'
import cheerio from 'cheerio'

class Home extends Component {

    state = {
        items: [],
      };

      fetchItems = () => {

        // Axios.get("https://www.fairprice.com.sg/category/beer")
        // .then((res) => {
        //     // console.log(res.data);
        //     let $ = cheerio.load(res.data);
        //     let x = $(".product-container"); //ntuc
      
        //     console.log("length of received products", x.length);
            
        //     let ntucPrices = []
        //     let ntucNames = []
        //     let ntucPackagings = []
        //     let ntucImgURLs = []
        //     let ntucProductURLs = []

        //     let ntucShop = [
        //         // {
        //         //     itemName: "",
        //         //     itemUnit: "",
        //         //     itemPrice: "",
        //         //     itemImgURL: "",
        //         // }
        //     ]

        //     for (let i = 0; i < x.length; i++) {

        //                     //FOR PRODUCT NAME PATH
        //                     // if(x[i].children[0].children[0].children[2]){
        //                     // console.log(x[i].children[0].children[0].children[2].children[1].children[0]
        //                     //     .children[0]
        //                     //     .data)
        //                     // }


        //                     // //PRODUXT URL PATHWAY
        //                     // if(x[i].children[0].children[0].children[2]){
        //                     // console.log(x[i].children[0].attribs.href)
        //                     // }


                            
        //                     //checkIMGPATH
        //                     // console.log(x[i].children[0].children[0].children[1].children[0].children[0].attribs["data-src"])

        //                     if(x[i].children[0].children[0].children[2]){
        //                     // price
        //                      ntucPrices.push(x[i]

        //                         .children[0]
        //                         .children[0]
        //                         .children[2]
        //                         .children[0]
        //                         .children[0]
        //                         .children[0]
        //                         .children[0]
        //                         .children[0]
        //                         .data.slice(1)
        //                     )


        //                     ntucNames.push(x[i]
                                
        //                         .children[0]
        //                         .children[0]
        //                         .children[2]
        //                         .children[1]
        //                         .children[0]
        //                         .children[0]
        //                         .data
        //                     )


        //                     ntucPackagings.push(x[i]
                            
        //                         .children[0]
        //                         .children[0]
        //                         .children[2]
        //                         .children[1]
        //                         .children[1]
        //                         .children[0]
        //                         .children[0]
        //                         .children[0]
        //                         .data
        //                     )

                            

        //                     ntucProductURLs.push(x[i]
                            
        //                         .children[0]
        //                         .attribs
        //                         .href
        //                     )


        //                     ntucImgURLs.push(x[i]

        //                         .children[0]
        //                         .children[0]
        //                         .children[1]
        //                         .children[0]
        //                         .children[0]
        //                         .attribs["data-src"]
        //                     )

                            
        //                     }
     
        //     }

        //     for (let i = 0; i < ntucNames.length; i++){
        //         let item = {
        //             itemName: ntucNames[i],
        //             itemUnit: ntucPackagings[i],
        //             itemPrice: ntucPrices[i],
        //             itemImgURL: ntucImgURLs[i],
        //             itemFrom: "FairPrice",
        //             itemOriURL: `https://www.fairprice.com.sg${ntucProductURLs[i]}`
        //         }

        //         ntucShop.push(item)
                
        //     }

        //     console.log(ntucShop)

        //     console.log(ntucPrices)
        //     console.log(ntucImgURLs)
        //     console.log(ntucNames)
        //     console.log(ntucPackagings)
        //     console.log(ntucProductURLs)
        // })
        // .catch((err) => {
        //     console.log(err);
        // });

       
        let token = localStorage.getItem("token");
    
        Axios.get(`${URL}/items`, {
          headers: {
            "x-auth-token": token,
          },
        })
          .then((res) => {
            console.log(res.data);
            
            // this.setState({ items: res.data.items });
            

        }).catch(err => console.log(err));
    
    }

    componentDidMount() {
        this.fetchItems();
      }


    render() {
        return (
            <div>
                <h1>HOME</h1>
                
            </div>
        )
    }
}


export default Home