import React from "react";
import { Navbar, Nav , Form, FormControl, Button} from "react-bootstrap";
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
          <Link className="nav-link" to="/item/add">
            Add item
          </Link>
        </Nav>

        {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-light">Search</Button>
        </Form> */}

        <Nav>
          {user ? (
            <>
              <Nav.Link href="#user">
                {user.fullName}
              </Nav.Link>
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
