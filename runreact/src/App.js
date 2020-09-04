import React, { Component } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home";
import CartInfo from "./components/items/CartInfo";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import EditProfile from "./components/user/EditProfile";
import OrderHistory from "./components/user/OrderHistory";
import Navigation from "./components/Navigation";
import Landing from "./components/Landing";
import Axios from "axios";
import { decode } from "jsonwebtoken";
import PrivateRoute from "./components/PrivateRoute";
import { Alert } from "react-bootstrap";
import './App.css';

const URL = process.env.REACT_APP_URL;

class App extends Component{
  state = {
    items: [],
    errorMessage: null,
    isAuth: false,
    user: null,
    cart: [],
    cartItem: 0
  };

  addToCart = (item) => {
          //copy state of cart
    let temp = [...this.state.cart]

    //temp solution
    let foundItemIndex = temp.findIndex(ele => ele.itemID === item.itemID) 
    
    let total, sum
    if(foundItemIndex !== -1){
      temp[foundItemIndex].quantity += 1  
      
      // console.log("sum of items: ",sum)
    }else{
      item.quantity = 1
      //push item from params to cart
      temp.push(item)
    }
     
      sum = 0
      temp.forEach(element => {
          sum += element.quantity
      });
      total = sum
      //take user id from token by decoding token
      let user = decode(localStorage.token)
      //convert this object to string for localStorage
      let userCart = JSON.stringify({ belongsTo: user.user.id, cart : temp })
    
     
      
      let finalTotal = total
      // set string to cart in localStorage
      localStorage.setItem('cart', userCart)  
      localStorage.setItem('cartItemTotal', finalTotal)  

      //set cart to state
      this.setState({ cart : temp, cartItem: finalTotal })
    //end temp solution   

  }

  removeToCart = (item) => {
    //copy state of cart
  let temp = [...this.state.cart]

    //temp solution
    let foundItemIndex = temp.findIndex(ele => ele.itemID === item.itemID) 

    if(foundItemIndex !== -1){

      if(temp[foundItemIndex].quantity > 1){
        temp[foundItemIndex].quantity -= 1 

      }else{
        // to splice
        temp.splice(foundItemIndex, 1)
      }
      let sum = 0
      temp.forEach(element => {
        sum += element.quantity
      });

     
      // console.log(temp)
      // 
      //
      //
       //take user id from token by decoding token
      let user = decode(localStorage.token)
      //convert this object to string for localStorage
      let userCart = JSON.stringify({ belongsTo: user.user.id, cart : temp })

      // let total = temp.reduce((a, b) => ({total : a.quantity + b.quantity}));

      // set string to cart in localStorage
      // let finalTotal = total.total
      // set string to cart in localStorage
      localStorage.setItem('cart', userCart)  
      localStorage.setItem('cartItemTotal', sum)  
      //set cart to state
      this.setState({ cart : temp, cartItem: sum })
   
    }
   
    //end temp solution   

}


  clearTransaction = () => {
    localStorage.removeItem('cart')
    localStorage.removeItem('cartItemTotal')
    this.setState({ cart : [], cartItem: 0 })

  }

  getUserProfile = (token) => {
    Axios.get(`${URL}/auth/user`, {
      headers: {
        "x-auth-token": token,
      },
    })
      .then((res) => {
        // console.log("user data: ",res.data);
        // console.log("user data: ",res.data.user._id);
       
        //check is cart is in localStorage
        if(localStorage.getItem('cart') != null){
          let cart = JSON.parse(localStorage.cart) //convert from string to object
          let sum = 0
          // console.log(cart.cart.length)
          for(let x = 0; x < cart.cart.length; x++){
              sum+= cart.cart[x].quantity
          }
          
          localStorage.setItem("cartItemTotal", sum)
          // + before a string converts string to number
          // let total = JSON.parse(localStorage.getItem('cartItemTotal'));
          
          // let total = cart.reduce((a, b) => ({total : a.quantity + b.quantity}))
          // console.log("after total")

          // console.log("get total : ", total)
          //check if current user is same as user in localStorage
          if(cart.belongsTo == res.data.user._id.toString()){
   
            this.setState({
              isAuth: true,
              user: res.data.user,
              cart: cart.cart,
              cartItem: sum
            });
          }
          
        }else{
          localStorage.removeItem("cart")
          localStorage.removeItem("cartItemTotal")
          this.setState({
            isAuth: true,
            user: res.data.user,
            cartItem: 0
          });
        }
        

        
      })
      .catch((err) => {
        // console.log(err);
        // this.setState({
        //   isAuth: false,
        // });
      });
  };

  loginHandler = (credentials) => {
    Axios.post(`${URL}/auth/login`, credentials)
    .then((res) => {
      // console.log('cred', credentials)
        // console.log('res data', res.data)
        localStorage.setItem("token", res.data.token)

        this.getUserProfile(res.data.token);
        this.setState({
          isAuth: true,
        });

    })
    .catch((err) => {
        // console.log(error)
        this.setState({
          isAuth: false,
          errorMessage: err.response.data.message,
        });

        setTimeout(()=>{this.setState({errorMessage: null})}, 3000)
    })
  }
  
  registerHandler = (credentials) => {
    //login here
    Axios.post(`${URL}/auth/register`, credentials)
      .then((res) => {
        // console.log(res.data);

        localStorage.setItem("token", res.data.token);
        this.getUserProfile(res.data.token);
        this.setState({
          isAuth: true,
        });
      })
      .catch((err) => {
        // console.log(err);
        this.setState({
          isAuth: false,
          errorMessage: err.response.data.message,
        });

        setTimeout(()=>{this.setState({errorMessage: null})}, 3000)
      });
  };



  logoutHandler = (e) => {
    //default action of anchor tag from one page to another. so you wanna stop it 
    e.preventDefault() // you dont want to redirect to /logout coz theres nothing there.
      console.log('loggedout')
      this.setState({
        items: [],
        errorMessage: null,
        isAuth: false,
        user: null,
      });

      localStorage.removeItem("token")
  }

  componentDidMount() {
    let token = localStorage.getItem("token");

    if (!(token == null)) {
      let decodedToken = decode(token);

      if (!decodedToken) {
        localStorage.removeItem("token");
      } else {
        this.getUserProfile(token);
        // this.setState({
        //   isAuth: true,
        // });
      }
    }
  }

  



  render(){

    let { isAuth, user, errorMessage } = this.state;
    

    return (
      
      <Router>
        <div className="overall">
        <Navigation user={user} logout={this.logoutHandler}/>
            
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            
        <Switch>
        <PrivateRoute exact path="/" isAuth={isAuth} cartItemTotal={this.state.cartItem}  cart={this.state.cart} addToCart={this.addToCart} component={Home} /> 

        <PrivateRoute exact path="/cart" isAuth={isAuth} removeItemCart={this.removeToCart} clearCart={this.clearTransaction} cart={this.state.cart} addToCart={this.addToCart} component={CartInfo} /> 
        
          <PrivateRoute
            exact
            path="/editprofile"
            isAuth={isAuth}
            component={EditProfile}
          />

          <PrivateRoute
            exact
            path="/orderHistory"
            isAuth={isAuth}
            component={OrderHistory}
          />

          <Route
            path="/register"
            exact
            render={() =>  isAuth ? <Redirect to="/" /> : <Register register={this.registerHandler} />}
          />
          <Route
            path="/login"
            exact
            render={() =>
              isAuth ? <Redirect to="/" /> : <Login login={this.loginHandler} />
            }
          />

          <Route
            path="/landing"
            exact
            render={() =>
              isAuth ? <Redirect to="/" /> : <Landing />
            }
          />

        </Switch>
        </div>
        <footer className="site-footer">
          Made with <i className="fas fa-heart"></i> - Andi L
          <a href="https://www.linkedin.com/in/andrea-lau-al/"><i className="fab fa-linkedin"></i></a> <a href="https://github.com/andicodetrf/BrewScanner"><i className="fab fa-github"></i></a>
        </footer>
        
      </Router>
      
    );
    }
}

export default App;
