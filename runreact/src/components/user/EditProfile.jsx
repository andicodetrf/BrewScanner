import React, { Component } from 'react'
import Axios from 'axios'
import { decode } from "jsonwebtoken";
import {Container, Form, Button, Row, Col} from "react-bootstrap"
import './EditProfile.css'

const URL = process.env.REACT_APP_URL;

class EditProfile extends Component {

    state={
        user: '',
        address: '',
    }

    getUser = (token) => {
        Axios.get(`${URL}/auth/user`, {
            headers: {
              "x-auth-token": token,
            },
          })
            .then((res) => {
            //   console.log(res.data);
      
              this.setState({
                user: res.data.user,
                address: res.data.user.address
              });
            })
            .catch((err) => {
              console.log(err);

            });

    }

 
    componentDidMount() {
        let token = localStorage.getItem("token");
    
        if (!(token == null)) {
          let decodedToken = decode(token);
    
          if (!decodedToken) {
            localStorage.removeItem("token");
          } else {
            this.getUser(token);
          }
        }
    } 

    changeHandler = (e) => {
        // console.log("I am editing the: ", e.target.value);
        this.setState({ address: e.target.value });
      };

      
    editUserHandler = () => {
        let token = localStorage.getItem("token");
        console.log('t', token)
            Axios.put(`${URL}/auth/user`, {address: this.state.address}, {
                headers: {
                  "x-auth-token": token,
                },
              })
            .then((res) => {
              console.log("done");
              this.getUser(token); //this will make it re-render immediately on the page. 
            })
            .catch((err) => {
              console.log(err);
            });
    }

    render() {

        if(this.state.user.birthDate){
            let d = new Date(this.state.user.birthDate)
            let bd = d.toDateString().substring(4)
        // let day = d.getDate()
        // let month = d.getMonth() + 1
        // let year = d.getMonth() + 1
        console.log(bd)
        // console.log(day)
        // console.log(month)
        }



        return (
            <div className="element-outer">
                <Container>

                <Row className="justify-content-md-center">
                    <Col md="5">

                    <Row className="mb-4">
                    <div className="element">
                        {this.state.user.fullName}    
                    </div>
                    <div className="element">
                        {this.state.user.birthDate}    
                    </div>
                    <div className="element">
                        {this.state.user.email}    
                    </div>
                    <div className="element">
                        {this.state.user.address}    
                    </div>
                        
                    </Row>    

                    <Row className="mb-4">
                        
                    <Form.Label>Update Address?</Form.Label>
                        <Form.Control 
                            name ="address" 
                            type="text" 
                            value={this.state.address}
                            onChange={this.changeHandler}
                        />
                    <Button className="mt-3 shadow-sm rounded" variant="warning" block onClick={this.editUserHandler}>
                    
                    Update</Button>

                    </Row>
                    </Col>
                </Row>

                

                </Container>
            
            </div>
        )
    }
}

export default EditProfile
