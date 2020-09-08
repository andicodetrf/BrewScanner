import React, {Component} from 'react'
import { Card } from "react-bootstrap";
// import { Link } from "react-router-dom";
import Axios from 'axios'
import './Landing.css'

class Landing extends Component {
    mount = true
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
            if(this.mount){
                this.setState({
                    qod: res.data.contents.quotes[0].quote, 
                    qodAuthor: res.data.contents.quotes[0].author, 
                })
            }
            
        })
        .catch((err) => console.log(err))
    }

    componentDidMount(){
        this.getQOD();
    }

    componentWillUnmount(){
        this.mount = false
    }

    render(){
        
        return (
            
            <div className="main-landing">
                <div className="landing-bg">

               
                <div className="typewriter">
                    <h1>Scanning for your cheapest brew! <i className="fas fa-glass-cheers"></i></h1>
                </div>

                <div className="none-type">
                    <h1>Scanning for your cheapest brew! <i className="fas fa-glass-cheers"></i></h1>
                </div>
             

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

                    <a href="#age-sect-id" className="">
                        <i class="fas fa-chevron-circle-down fa-4x"></i>
                        </a>

                    </section>

                </div>

                <section className="age-section" id="age-sect-id">

                    <div className="checkbox">
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" name="checkAge" onChange={this.changeHandler}/>
                            <label className="form-check-label">Are you 18 or above?</label>
                        </div>
                    </div>

                    <div  id="eligible-reg">
                    {this.state.isAbove18 ? 
                    
                            <a href="/register" className="mt-3 animate__animated animate__slideInUp btn btn-outline-warning">Sign Up</a>
                        
                    : null}
                    </div>
                    
                    </section>
                
                
                
                
            
            </div>
            
            
        )
    }
}

export default Landing
