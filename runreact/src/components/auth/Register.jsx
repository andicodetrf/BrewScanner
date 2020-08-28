import React, { Component } from 'react'
import {Row, Form, Button, Container, Col} from 'react-bootstrap'

export default class Register extends Component {

    state={
        fullname:"",
        birthDate: "",
        address: "",
        email: "",
        password: ""
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    childSignUpHandler = () => {
        this.props.register(this.state)
    }


    render() {

        let dateToday = new Date()
        let day= dateToday.getDate()
        let month= dateToday.getMonth()+1
        let year= dateToday.getFullYear()-18
        let actDay = (day<10) ? `0${day}` : day
        let actMth = (month<10) ? `0${month}` : month

        let maxDate = `${year}-${actMth}-${actDay}`
        // console.log(maxDate)

        return (
            <div>
                <h1>Register</h1>
                <Container>
                <Row className="justify-content-md-center">
                <Col md="8">
                <Row className="mb-4">
                <Form.Label>Full Name</Form.Label>
                    <Form.Control 
                        name ="fullName" 
                        type="text" 
                        placeholder="John Doe"
                        onChange={this.changeHandler}
                    />
                </Row>
                <Row className="mb-4">
                <Form.Label>Date of Birth</Form.Label>
                    <Form.Control 
                        min="1910-01-01" max={maxDate}
                        name ="birthDate" 
                        type="date" 
                        onChange={this.changeHandler}
                    />
                </Row>

                <Row className="mb-4">
                <Form.Label>Address</Form.Label>
                    <Form.Control 
                        name ="address" 
                        type="text" 
                        placeholder="79 Anson Rd"
                        onChange={this.changeHandler}
                    />
                </Row>

                <Row className="mb-4">
                <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        name ="email" 
                        type="email" 
                        placeholder="johnny@gmail.com"
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

               
                <Row className="mb-4">
                <Button variant="dark" block onClick={this.childSignUpHandler}>
                    {" "}
                    Register</Button>
                </Row>

                </Col>
                </Row>

                </Container>
            </div>
        )
    }
}
