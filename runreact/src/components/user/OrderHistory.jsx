import React, { Component } from 'react'
import Axios from 'axios'
import { Card, Container, Badge } from 'react-bootstrap';


const URL = process.env.REACT_APP_URL;
class OrderHistory extends Component {


    state={
        orderHistory: []
    }

    getTransactions = () => {
        let token = localStorage.getItem("token");
        Axios.get(`${URL}/transaction`, {
            headers: {
              "x-auth-token": token,
            },
          })
            .then((res) => {
              console.log(res.data);
      
              this.setState({
                orderHistory: res.data.finalT
              });
            })
            .catch((err) => {
              console.log(err);

            });

    }

    componentDidMount(){
        this.getTransactions()
    }

    render() {
        return (
            <div>
                <Container>
                <h3 className="text-center my-5">Order History</h3>

                {(this.state.orderHistory.length > 0) ? 
                
                    this.state.orderHistory.map((h,idx) => 
                        <Card key={idx}>
                            <Card.Header>
                            <Badge variant="success" style={{fontSize: "15px", marginRight: "5px"}}>Paid on {h.createdAt.substring(0,10)}</Badge>
                                <Badge variant="danger" style={{fontSize: "15px"}}>Total : ${h.orderTotal.toFixed(2)}</Badge>

                            </Card.Header>
                            <Card.Body>
                                {h.orders.map((item,i) => 
                                <li key={i}>{item.itemName} - {item.itemUnit}  <span className="badge badge-dark">{item.quantity} x ${item.itemPrice.toFixed(2)} per unit</span> </li>
                                )}
                            </Card.Body>
                        </Card>
                        // <li>{h.orderTotal}</li>
                    )
                        : null
            
                }


                </Container>
            </div>
        )
    }
}


export default OrderHistory