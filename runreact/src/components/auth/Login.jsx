import React, { Component } from 'react'
import {Row, Form, Button, Container, Col, Card} from 'react-bootstrap'
// import axios from 'axios'

// const URL = process.env.REACT_APP_URL
export default class Login extends Component {

    state={
        email: "",
        password: ""
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }


    childLoginHandler = () => {
        // console.log(this.state)
        this.props.login(this.state)
    }


    render() {
        return (
            <div className="log-reg">
                
                <Container>
                <Row className="justify-content-md-center">
                <Col md="5">
                
                <Row className="mb-4 mt-4">
                <h3>Log In</h3>
                </Row>
                <Row className="mb-4">
                <Form.Label>Email</Form.Label>
                    <Form.Control 
                        name ="email" 
                        type="email" 
                        onChange={this.changeHandler}
                    />
                </Row>

                <Row className="mb-4">
                <Form.Label>Password</Form.Label>
                    <Form.Control 
                        name ="password" 
                        type="password" 
                        onChange={this.changeHandler}
                    />
                </Row>

                <Row>
                <Button className="mt-3" variant="warning" block onClick={this.childLoginHandler}>
                    {" "}
                    Log In</Button>

                    </Row>
                
                    <Card className="mt-5 shadow mb-3 bg-dark text-white rounded text-center" style={{width: "100%"}}>
                        <Card.Body>
                            <h4><u>DEMO Account</u></h4>
                            <h6>Email: guest@gmail.com</h6>
                            <h6>Password: happyhour123</h6>
                        </Card.Body>
                    </Card>
                

                
                
                </Col>
                </Row>
                    
                </Container>
            </div>
        )
    }
}
