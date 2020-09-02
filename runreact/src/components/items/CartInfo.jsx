import React, { Component } from 'react'
import { Card, Container, Row, Button, Col, Badge } from "react-bootstrap";
import StripeCheckout from 'react-stripe-checkout'
import Axios from 'axios'
import {toast} from 'react-toastify'

const URL = process.env.REACT_APP_URL;
const reactStripeKey = process.env.REACT_APP_STRIPE_KEY;

toast.configure()

class CartInfo extends Component {
    state={
        totalCost: '',
        order: ''

    }

    componentDidMount(){
        let mapTotal = this.props.cart.map((a)=>{
            return Number((a.itemPrice * a.quantity).toFixed(2))
        }) 

         let bill = mapTotal.reduce((a,b) => { return a+b}, 0)

        this.setState({totalCost: bill.toFixed(2)})
        this.setState({order: this.props.cart})

    }

    removeItemFromCart = (item) => {

        this.props.removeItemCart(item)
         
        let totalCost = this.state.totalCost - item.itemPrice

        // let updatedOrder = this.props.cart.filter(el => el.itemID !== item.itemID)
        // console.log(updatedOrder)

        let updatedOrder;
        console.log('a1', item.quantity)
        if(item.quantity > 1){
            // item.quantity = item.quantity - 1
            
            // let toDDTIndex = this.state.order.findIndex(el => el.itemID === item.itemID)

            // console.log('a1', item)
            // let temp = [...this.state.order]
            // updatedOrder = temp.splice(toDDTIndex, 1, item)
            // console.log('a2', item)
            updatedOrder = this.props.cart


        } else if (item.quantity === 1) {
            updatedOrder = this.props.cart.filter(el => el.itemID !== item.itemID)
            console.log('b')
        }
        console.log('c', this.state.order)
        console.log('c', updatedOrder)
        this.setState({totalCost: totalCost.toFixed(2), order: updatedOrder})
        
    }

    async handleToken(token){
        // let {order} = this.state
        // console.log({token, addresses})
        const response = await Axios.post(`${URL}/checkout`, {
            token, 
            // order
        })

        const {status} = response.data
        if( status = "success"){
            toast(
                    'Success! Check email for details',
                    {type: 'success'}
                )
        } else{
            toast(
                    "Ooops! It didn't go through",
                    {type: 'error'}
                )
        }

    }

    render() {

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
                                <small className="text-muted"> - ${item.itemPrice}</small>

                                <p className="mt-3"><Badge variant="success">${(item.quantity*item.itemPrice).toFixed(2)}</Badge></p>
                                

                                <Badge variant="warning" >Quantity: {item.quantity}

                                <span className="badge badge-danger ml-3" variant="danger" onClick={()=>{this.removeItemFromCart(item)}} style={{cursor:"pointer"}}><i className="fas fa-trash-alt"></i></span>
                                
                                </Badge>
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
                            <div className="text-center my-5">
                            <StripeCheckout
                                stripeKey={`${reactStripeKey}`}
                                token={this.handleToken}
                                billingAddress
                                shippingAddress
                                amount={this.state.totalCost*100}
                                orderTotal={this.state.order}
                            />
                            </div>
                        </Col>

                    </Row>
                </Container>

            </div>
        )
    }
}


export default CartInfo
