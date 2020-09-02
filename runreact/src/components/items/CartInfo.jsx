import React, { Component } from 'react'
import { Card, Container, Row, Button, Col, Badge } from "react-bootstrap";

class CartInfo extends Component {
    state={
        totalCost: ''
    }

    componentDidMount(){
        let mapTotal = this.props.cart.map((a)=>{
            return Number((a.itemPrice * a.quantity).toFixed(2))
        }) 

         let bill = mapTotal.reduce((a,b) => { return a+b}, 0)

        // console.log(mapTotal)
        // console.log(bill)
        this.setState({totalCost: bill.toFixed(2)})

    }

    removeItemFromCart = (item) => {

        this.props.removeItemCart(item)
         
        let totalCost = this.state.totalCost - item.itemPrice
        this.setState({totalCost: totalCost.toFixed(2)})
    }

    render() {

        // let cost = (item.quantity * item.itemPrice).toFixed(2)

        return (
            <div>
                <Container>
                    <Row>
                        <Col md="8">
                        <Card className="bg-dark text-light mt-5">
                            <Card.Header>
                                <h4>Cart Items</h4>
                            </Card.Header>
                        </Card>
                        {this.props.cart.map(item => (
                            <Card key={item.itemID}>
                                
                            <Card.Body key={item.itemID}>
                                <strong>{item.itemName} - {item.itemUnit} </strong>

                                <p className="mt-3"><Badge variant="success">${(item.quantity*item.itemPrice).toFixed(2)}</Badge></p>
                                

                                <p>Quantity: {item.quantity}

                                <span className="badge badge-danger ml-3" variant="danger" onClick={()=>{this.removeItemFromCart(item)}} style={{cursor:"pointer"}}><i className="fas fa-trash-alt"></i></span>

                                </p>
                                </Card.Body>
                            </Card>
                        ))}

                            <Card className="bg-dark text-light">
                            <Card.Footer className="text-right">
                                <h4>Total Cost:<span className="ml-2 text-warning">${this.state.totalCost}</span></h4>
                            </Card.Footer>
                        </Card>

                        </Col>

                       

                        <Col md="4">
                        </Col>

                    </Row>
                </Container>

            </div>
        )
    }
}


export default CartInfo
