import React, { Component } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home";
// import Item from "./components/items/Item";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Navigation from "./components/Navigation";
import Axios from "axios";
// import AddItem from "./components/items/AddItem";
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
  };



  getUserProfile = (token) => {
    Axios.get(`${URL}/auth/user`, {
      headers: {
        "x-auth-token": token,
      },
    })
      .then((res) => {
        console.log(res.data);

        this.setState({
          isAuth: true,
          user: res.data.user,
        });
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
      console.log('cred', credentials)
        console.log('res data', res.data)
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
    })
  }
  
  registerHandler = (credentials) => {
    //login here
    Axios.post(`${URL}/auth/register`, credentials)
      .then((res) => {
        console.log(res.data);

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
        });
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
        <Navigation user={user} logout={this.logoutHandler}/>
        {errorMessage && <Alert>{errorMessage}</Alert>}
        <Switch>
          <PrivateRoute exact path="/" isAuth={isAuth} component={Home} />
          {/* <PrivateRoute
            exact
            path="/item/add"
            isAuth={isAuth}
            component={AddItem}
          /> */}

          {/* <Route path="/" exact render={() => <Home />} /> */}
          {/* <Route path="/item/add" exact render={() => <AddItem />} /> */}
          {/* <PrivateRoute
            exact
            path="/item/:id"
            isAuth={isAuth}
            component={Item}
          /> */}
          {/* <Route path="/item/:id" component={Item} /> */}
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
        </Switch>
      </Router>
    );
    }
}

export default App;
