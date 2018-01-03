import React, { Component } from 'react';
import { auth } from '~/fire';
import { NavLink } from 'react-router-dom';
import { Navbar, NavItem, Dropdown, Modal } from 'react-materialize';
import '~/public/navbar.css';

export default class NavBar extends Component {
  render() {
    return (
      <Navbar brand="ToGoBOX" right>
        <NavItem href="get-started.html">Menu</NavItem>
        <NavItem href="get-started.html">Restaurants</NavItem>
        <NavItem href="get-started.html">Reviews</NavItem>
        <NavItem href="get-started.html">Login</NavItem>
        <NavItem href="get-started.html">Signup</NavItem>
      </Navbar>
    );
  }
}
