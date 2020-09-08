import React from "react";
import { Navbar, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import bottlecheers from './navImg/bottlecheers.png'
// import mugbottle from './navImg/mugbottle.png'

function Navigation({ user, logout }) {
    // console.log(user)
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      
      <Navbar.Brand>
        <Link to="/" className="navbar-brand">
        <img src={bottlecheers} id="navlogo" alt="" height="40px" width="40px"/>  
          BrewScanner
          </Link>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <OverlayTrigger
                key="home"
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip-bottom">
                    Home
                  </Tooltip>
                }
              >
            <Link className="nav-link" to="/">
            <i className="fas fa-home navbar-fa"></i>
              
            </Link>
        </OverlayTrigger>
        </Nav>

        <Nav>
          {user ? (
            <>
              <OverlayTrigger
                key="cart"
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip-bottom">
                    View Cart
                  </Tooltip>
                }
              >
                <Link className="nav-link nav-view-cart" to="/cart">
                  <i className="fas fa-shopping-cart"></i>
                </Link>
              </OverlayTrigger>
        
              <OverlayTrigger
                key="orderHistory"
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip-bottom">
                    Order History
                  </Tooltip>
                }
              >
                  <Link to="/orderHistory" className="nav-link">
                  <i className="fas fa-history"></i>
                  </Link>
              </OverlayTrigger>

              <OverlayTrigger
                key="userprofileicon"
                placement="bottom"
                overlay={
                  <Tooltip id="tooltip-bottom">
                    User Profile
                  </Tooltip>
                }
              >
                <Link to="/editprofile" className="nav-link">
                  <i className="fas fa-user-circle navbar-fa"></i>
                </Link>

              </OverlayTrigger>

                <div className="nav-link user-name"> 
                    {user.fullName}
                </div>

              <Link onClick={logout} to="/logout" className="nav-link">
              <div className="nav-items-hover loginout">Log Out</div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                <div className="nav-items-hover loginout">Log In</div>
              </Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
