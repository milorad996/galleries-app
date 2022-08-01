import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectIsAuthenticated } from "../store/auth/selectors";
import { logout } from "../store/auth/slice";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavbarComponent() {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    console.log(isAuthenticated)
    const dispatch = useDispatch();





    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div>

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
                <Container>
                    <Navbar.Brand href="#home">Gallery App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                            <Nav.Link> <Link to="/">All Galleries</Link></Nav.Link>

                        </Nav>
                        <Nav>
                            <Nav.Link>{isAuthenticated && (

                                <li>
                                    <Link to="/my-galleries">My Galleries</Link>
                                </li>
                            )}</Nav.Link>

                        </Nav>
                        <Nav>
                            <Nav.Link>{isAuthenticated && (

                                <li>
                                    <Link to="/create">Create New Gallery</Link>
                                </li>
                            )}</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>

                    <Navbar.Collapse className="justify-content-end">

                        <Nav>
                            <Nav.Link>{!isAuthenticated && (

                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                            )}</Nav.Link>
                            <Nav.Link className="justify-content-end">{!isAuthenticated && (
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                            )}</Nav.Link>
                            <Nav.Link className="justify-content-end">{isAuthenticated && (
                                <li>
                                    <span onClick={handleLogout}>Logout</span>
                                </li>
                            )}</Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}