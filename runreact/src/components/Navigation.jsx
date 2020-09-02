import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navigation({ user, logout }) {
    // console.log(user)
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand href="/">BrewScanner</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </Nav>

        <Nav>
          {user ? (
            <>
            
              <Link to="/editprofile" className="nav-link">
                {user.fullName}
              </Link>
              <Link onClick={logout} to="/logout" className="nav-link">
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              {/* <Link to="/register" className="nav-link">
                Register
              </Link> */}
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
