import React, { Component } from 'react';
import {
    Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import '../App.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            isNavOpen: false
        };
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
    render() {
        return (
            <>
                <div className="fixed">
                    <Navbar dark expand="md" >
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">ABC Airlines</NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/flights'><span className="fa fa-plane fa-lg"></span> Flights</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/deals'><span className="fa fa-tag fa-lg"></span> Deals</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/hotels'><span className="fa fa-hotel fa-lg"></span> Hotels</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/contact'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/login'><span className="fa fa-sign-in fa-lg ml-auto"></span> Login/Dasboard</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
                <Jumbotron>
                    <div>
                        <h1>ABC Search</h1>
                        <p>ABC Search aims to find the best deals on hotels,restaurants and airline tickets.So that you can get the best deals.</p>
                    </div>
                </Jumbotron>
            </>
        );
    }
}
export default Header;