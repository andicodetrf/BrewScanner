import React, { Component } from 'react'
import { Card, Container, Row, Col, Badge } from "react-bootstrap";
import StripeCheckout from 'react-stripe-checkout'
import Axios from 'axios'
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'
// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';
// import CheckoutForm from './CheckoutForm';
// // import {CardElement} from '@stripe/react-stripe-js';


const URL = process.env.REACT_APP_URL;
const reactStripeKey = process.env.REACT_APP_STRIPE_KEY;
// const stripePromise = loadStripe(`${reactStripeKey}`);

toast.configure()

class CartInfo extends Component {
    state={
        totalCost: '0.00',
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
        
        let itemQtyBeforeRemove = item.quantity;
        // console.log('before remove', item.quantity)
        this.props.removeItemCart(item)
         
        let totalCost = this.state.totalCost - item.itemPrice


        let updatedOrder;
        console.log('after remove', item.quantity)
        if(itemQtyBeforeRemove > 1){

            updatedOrder = this.props.cart

        } else if (item.quantity === 1) {
            updatedOrder = this.props.cart.filter(el => el.itemID !== item.itemID)
            // console.log('b')
        }
        // console.log('c', this.state.order)
        // console.log('c', updatedOrder)
        this.setState({totalCost: totalCost.toFixed(2), order: updatedOrder})
        
    }

    async handleToken(token){
        // let {order:{itemFrom, itemName, itemID, itemPrice, itemUnit, quantity}} = this.state
        console.log({token})
        const response = await Axios.post(`${URL}/checkout`, {
            token, 
            // order
        })

        let {status} = response.data
        if( status === "success"){
            toast(
                    'Success! Check email for details',
                    {type: 'success'}
                )
        } else {
            toast(
                    "Ooops! It didn't go through",
                    {type: 'error'}
                )
        }
    }

    submitTransactHandler = () => {
        let token = localStorage.getItem("token");
        let LSCart = JSON.parse(localStorage.cart)
        let LSuserID = LSCart.belongsTo
        
        // console.log('t', token)
        console.log(LSuserID)
            Axios.post(`${URL}/transaction`, {orders: this.state.order, orderTotal: this.state.totalCost, transactionUserID: LSuserID}, {
                headers: {
                  "x-auth-token": token,
                },
              })
            .then((res) => {
              console.log("order submitted to server");
            //   this.props.clearCart()
            this.clearCartHandler()
             
            })
            .catch((err) => {
              console.log(err);
            });
    }

    clearCartHandler =() => {
        this.props.clearCart()
        this.setState({totalCost: '0.00'})
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
                                <span className="badge badge-danger" style={{cursor:"pointer"}} onClick={this.clearCartHandler}>Clear All</span>
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

                            <div className="mt-2">
                            <Link to="/" className="btn btn-outline-success shadow-sm rounded submit-order" onClick={this.submitTransactHandler}>Submit Order</Link>
                            </div>

                        {/* <Elements stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements> */}

                            </div>
                        </Col>

                    </Row>
                </Container>

            </div>
        )
    }
}


export default CartInfo
