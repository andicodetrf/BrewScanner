import React, {Component} from 'react'
import landingImg from './beercheers.jpg'
import { Container, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from 'axios'

class Landing extends Component {

    state={
        isAbove18: false,
        qod: '',
        qodAuthor: '',
    }

    changeHandler = (e) => {
        this.setState({isAbove18: !this.state.isAbove18})
    }

    getQOD = () => {
        Axios.get('http://quotes.rest/qod.json?category=inspire')
        .then((res) => {
            // console.log(res.data.contents)
            this.setState({
                qod: res.data.contents.quotes[0].quote, 
                qodAuthor: res.data.contents.quotes[0].author, 
            })
        })
        .catch((err) => console.log(err))
    }

    componentDidMount(){
        this.getQOD();
    }

    render(){
        // console.log(this.state)
        return (
            
            <div className="main-landing">
                <div className="landing-bg">
               
                    <Card className="qod-card text-dark text-left">
                        <Card.Header>
                        <i className="fas fa-quote-left"></i>
                        </Card.Header>
                        <Card.Body className="cardbody">
                        
                            <blockquote className="blockquote mb-0">
                                <p>{this.state.qod}</p>
                            </blockquote>
                    
                        </Card.Body>
                        <Card.Footer className="text-right">
                            <footer className="blockquote-footer">{this.state.qodAuthor} 
                            {/* <cite title="Source Title">Source Title</cite> */}
                            
                            <span className="tss">
                                <img src="https://theysaidso.com/branding/theysaidso.png" height="20" width="20" alt="theysaidso.com"/>
                                <a href="https://theysaidso.com" title="Powered by quotes from theysaidso.com" >
                                    They Said So®
                                </a>
                            </span>
                            </footer>
                            
                        </Card.Footer>
                    </Card>



                    <section className="arrow animate__animated animate__fadeInDown">

                    <a href="#age-sect-id" className=""><i className="fas fa-angle-down fa-5x"></i></a>

                    </section>

                </div>

                <section className="age-section" id="age-sect-id">
                    <div className="badge badge-danger py-2 px-2 checkbox">
                        <input type="checkbox" name="checkAge" onChange={this.changeHandler}/> Are you above 18?
                    </div>

                    <div  id="eligible-reg">
                    {this.state.isAbove18 ? 
                    
                        // <Button variant="outline-warning " className="mt-3 animate__animated animate__slideInUp btn btn-link" > 
                        //         <Link to="/register" className="">
                        //             Sign Up
                        //         </Link>
                        //     </Button>

                            <a href="/register" className="mt-3 animate__animated animate__slideInUp btn btn-outline-warning">Sign Up</a>
                        
                    : null}
                    </div>
                    
                    </section>
                
                
                
                
            
            </div>
            
            
        )
    }
}

export default Landing
