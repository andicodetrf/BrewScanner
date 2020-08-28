import React, { Component } from 'react'
import Axios from 'axios'
import cheerio from 'cheerio'

class Home extends Component {

    state = {
        items: [],
      };

      fetchItems = () => {

        Axios.get("https://www.fairprice.com.sg/category/infant-formula--1")
        .then((res) => {
            // console.log(res.data);
            let $ = cheerio.load(res.data);
            let x = $(".product-container");
            console.log("length of received products", x.length);
            // console.log(x);
            let prices = []
            let names = []
            let qtys = []
            for (let i = 0; i < x.length; i++) {
                            // price
                            prices.push(x[i]
                                .children[0].children[0]
                                .children[1]
                                .children[0]
                                .children[0].children[0]
                                .children[0].children[0]
                                .data
                            );
                            // name
                            names.push(x[i]
                                .children[0].children[0]
                                .children[1].children[1]
                                .children[0].children[0]
                                .data
                            );
                            // qty
                            qtys.push(x[i]
                                .children[0].children[0]
                                .children[1].children[1]
                                .children[1].children[0]
                                .children[0].children[0]
                                .data
                            );
                        }
                        console.log(prices)
                        console.log(names)

        })

       
        // let token = localStorage.getItem("token");
    
        // Axios.get(`${URL}/items`, {
        //   headers: {
        //     "x-auth-token": token,
        //   },
        // })
        //   .then((res) => {
        //     console.log(res.data);
            
        //     this.setState({ items: res.data.items });
            
        //   })
          .catch((err) => {
            console.log(err);
          });
      };
    
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