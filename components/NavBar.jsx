import React, { Component } from 'react';
import { auth } from '~/fire';
import { NavLink } from 'react-router-dom';
import { Navbar, NavItem, Dropdown, Modal } from 'react-materialize';
import '~/public/navbar.css';

export const NavBar = ({ currentUser }) =>
  <Navbar brand="ToGoBOX" right>
    <NavItem href="/menu">Menu</NavItem>
    <NavItem href="/rest">Restaurants</NavItem>
    <NavItem href="/review">Reviews</NavItem>
    {!currentUser || currentUser.isAnonymous
      ? [
          <NavItem href="/login" key={1}>
            Login
          </NavItem>,
          <NavItem href="/register" key={2}>
            Register
          </NavItem>
        ]
      : <NavItem href="#" onClick={() => auth.signOut()}>
          Logout
        </NavItem>}
  </Navbar>;
