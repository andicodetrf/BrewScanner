import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import bottlecheers from './navImg/bottlecheers.png'
// import mugbottle from './navImg/mugbottle.png'

function Navigation({ user, logout }) {
    // console.log(user)
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      
      <Navbar.Brand href="/">
      <img src={bottlecheers} id="navlogo" alt="" height="40px" width="40px"/>  
        BrewScanner
        
        </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className="nav-link" to="/">
          <i className="fas fa-home navbar-fa"></i>
            
          </Link>
        </Nav>

        <Nav>
          {user ? (
            <>
            <Link className="nav-link nav-view-cart" to="/cart">
            <i className="fas fa-shopping-cart"></i>
            </Link>

            <Link to="/orderHistory" className="nav-link">
              <i className="fas fa-history"></i>
              </Link>
              
              <Link to="/editprofile" className="nav-link">
                <i className="fas fa-user-circle navbar-fa"></i>
                </Link>
              <Link to="/editprofile" className="nav-link">
                <div className="nav-items-hover">{user.fullName}</div>
              </Link>
              <Link onClick={logout} to="/logout" className="nav-link">
              <div className="nav-items-hover">Log Out</div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
              <div className="nav-items-hover">Log In</div>
              </Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
