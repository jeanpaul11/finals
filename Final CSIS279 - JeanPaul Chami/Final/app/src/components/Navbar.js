import React, { Component } from 'react';
import '../App.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

class NavbarComponent extends Component {
    constructor(props) {
        super(props);
        this.logOutUser = this.logOutUser.bind(this);
        this.state = { username: '' };
    }

    componentDidMount() {
        this.getUsernameFromStorage();
    };

    getUsernameFromStorage() {
        let user_username;
        if (localStorage.length !== 0) {
            user_username = localStorage.getItem('username');
        }
        else {
            user_username = sessionStorage.getItem('username');
        }

        this.setState({ username: user_username });
    }

    logOutUser() {
        if (localStorage.length !== 0) {
            localStorage.clear();
        }
        else {
            sessionStorage.clear();
        }


        this.props.history.push('/');
    }

    itemForm = event => {
        event.preventDefault();
        this.props.history.push("/ItemForm", {
            operation: "add",
            data: null,
        })
    }

    render() {
        return (
            <Navbar bg="light" expand="xl">
                <Navbar.Brand href="/Home">feedMe</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="feeMe">
                        <Nav.Link onClick={this.itemForm} className="nav-link">choose an item</Nav.Link>
                        <Nav.Link href="/Orders">Your orders</Nav.Link>
                        <Nav.Link href="/Items">Your items</Nav.Link>
                        <Nav.Link href="/Prices">Prices</Nav.Link>
                        <Nav.Link href="/transactions">Prices</Nav.Link>

                        <NavDropdown title="Account" id="basic-nav-dropdown">
                            <NavDropdown.Item>{this.state.username}</NavDropdown.Item>
                            <NavDropdown.Item href="/ResetPassword">Change password</NavDropdown.Item>
                            <NavDropdown.Item href="/DeleteAccount">Delete account</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={this.logOutUser}>Log out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavbarComponent;