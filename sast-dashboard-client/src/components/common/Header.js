import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

// Navbar component which will be rendered in App.js at the top
function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/" className="btn btn-dark">
          Nanoheal
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav>
            <Link to="/" className="nav-link">
              Dashboard
            </Link>
          </Nav>
          &nbsp;&nbsp;
          <Nav>
            <Link to="/add" className="nav-link">
              Add New
            </Link>
          </Nav>
        </Nav>
        <Nav>
          <Nav>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </Nav>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
