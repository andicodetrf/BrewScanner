import React, { Component } from 'react'
import Axios from 'axios'
import {Container, Button, Row, Col, Card} from "react-bootstrap"
// import cheerio from 'cheerio'


const URL = process.env.REACT_APP_URL;
class Home extends Component {

    state = {
        items: [],
      };

    //   fetchItems = () => {

    //     let token = localStorage.getItem("token");
    
    //     Axios.get(`${URL}/items`, {
    //       headers: {
    //         "x-auth-token": token,
    //       },
    //     })
    //       .then((res) => {
    //         console.log(res.data);
            
    //         this.setState({ items: res.data.items });
            

    //     }).catch(err => console.log(err));
    
    // }

    componentDidMount() {
        this.fetchItems();
      }


    render() {
        return (
            <div>
                <h1>HOME</h1>
                <Container>
                  <Row className="row-cols-1 row-cols-md-3">
                  {this.state.items.map( item => (
                          <Col key={item.ID} md="4">
                              <Card style={{width:"20em"}} className="mb-3">
                              <Card.Img variant="top" src={item.itemImgURL} height="200px" style={{objectFit:"contain"}}/>
                                  <Card.Body className="text-sm">
                                      {item.itemName}
                                      <div>
                                      {item.itemUnit}
                                      </div>
                                      <div>
                                      ${item.itemPrice}
                                      </div>
                                      <div>
                                      Supplied By: {item.itemFrom}
                                      </div>
                                      <div>
                                        <a href={item.itemOriURL} target="_blank">Visit {item.itemFrom}</a>
                                      </div>
                                  </Card.Body>
                              </Card>
                          </Col>
                  ))}
                  </Row>


                </Container>
            </div>
        )
    }
}


export default Home