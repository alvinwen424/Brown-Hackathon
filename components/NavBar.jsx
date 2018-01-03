import React, { Component } from 'react';
import { auth } from '~/fire';
import { NavLink } from 'react-router-dom';
import { Navbar, NavItem, Dropdown, Modal } from 'react-materialize';
import '~/public/navbar.css';

export default class NavBar extends Component {
  render() {
    return (
      <Navbar brand="ToGoBOX" right>
        <NavItem href="/menu">Menu</NavItem>
        <NavItem href="/rest">Restaurants</NavItem>
        <NavItem href="/review">Reviews</NavItem>
        <NavItem href="/login">Login</NavItem>
        <NavItem href="/signup">Signup</NavItem>
      </Navbar>
    );
  }
}
