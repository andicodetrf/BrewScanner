import React, { Component } from 'react'
import {Row, Form, Button, Container, Col, Alert} from 'react-bootstrap'

export default class Register extends Component {

    state={
        fullName:"",
        birthDate: "",
        address: "",
        email: "",
        password: "",
        regError: "",
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    childSignUpHandler = () => {
        console.log('line20', this.state)

        if(!this.state.fullName || !this.state.birthDate || !this.state.address || !this.state.email){
            this.setState({regError: "All fields are required to complete the registration"})
        } 
        
        if (!this.state.password || this.state.password.length < 5){
            this.setState({regError: "Minimum 5 characters required for Password"})
        } else {
            this.props.register(this.state)
        }

            setTimeout(()=>{
                this.setState({regError: ''})
            }, 3000)
        
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
                {(this.state.regError.length>0)? <Alert variant="danger">{this.state.regError}</Alert> : null}

                <Row className="justify-content-md-center">
                <Col md="8">
                <Form>
                <Row className="mb-4">
                <Form.Label>Full Name</Form.Label>
                    <Form.Control 
                        name ="fullName" 
                        type="text" 
                        placeholder="John Doe"
                        onChange={this.changeHandler}
                        required
                    />
                    <small className="form-text text-muted">Required.</small>
                </Row>
                
                <Row className="mb-4">
                <Form.Label>Date of Birth</Form.Label>
                    <Form.Control 
                        min="1910-01-01" max={maxDate}
                        name ="birthDate" 
                        type="date" 
                        onChange={this.changeHandler}
                        required
                    />
                    <small className="form-text text-muted">Required.</small>
                </Row>

                <Row className="mb-4">
                <Form.Label>Address</Form.Label>
                    <Form.Control 
                        name ="address" 
                        type="text" 
                        placeholder="79 Anson Rd"
                        onChange={this.changeHandler}
                        required
                    />
                    <small className="form-text text-muted">Required.</small>
                </Row>

                <Row className="mb-4">
                <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        name ="email" 
                        type="email" 
                        placeholder="johnny@gmail.com"
                        onChange={this.changeHandler}
                        required
                    />
                    <small className="form-text text-muted">Required.</small>
                </Row>

                <Row className="mb-4">
                <Form.Label>Password</Form.Label>
                    <Form.Control 
                        name ="password" 
                        type="password" 
                        onChange={this.changeHandler}
                        required
                    />
                    <small class="form-text text-muted">Required. 5 characters minimum</small>
                </Row>
                

               
                <Row className="mb-4">
                <Button variant="dark" block onClick={this.childSignUpHandler}>
                    {" "}
                    Register</Button>
                </Row>
                </Form> 

                </Col>
                </Row>

                {/* <input type="text" required/>
                <input type="submit" value="submit"/> */}
                </Container>
            </div>
        )
    }
}
