import React, {Component} from 'react'
import landingImg from './beercheers.jpg'
import { Container, Button,  } from "react-bootstrap";
import { Link } from "react-router-dom";


class Landing extends Component {

    state={
        isAbove18: false,
    }


    changeHandler = (e) => {
        this.setState({isAbove18: !this.state.isAbove18})
    }

    render(){
        console.log(this.state)
        return (
                
                <div className="landing-bg text-center">
               

                    <div className="badge badge-danger py-2 px-2">
                        <input type="checkbox" name="checkAge" onChange={this.changeHandler}/> Are you above 18?
                    </div>

                    {this.state.isAbove18 ? 
                    
                        <Button variant="dark" className="mt-3"> 
                                <Link to="/register" className="text-light">
                                    Sign Up
                                </Link>
                            </Button>
                        
                    : null}
                    
                
                
                
                
            </div>
            
        )
    }
}

export default Landing
