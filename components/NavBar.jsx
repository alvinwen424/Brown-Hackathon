import React, { Component } from 'react';
import { auth } from '~/fire';
import { NavLink } from 'react-router-dom';
import { Navbar, NavItem, Dropdown, Modal } from 'react-materialize';
import '~/public/navbar.css';

export const NavBar = ({ currentUser }) =>
  <Navbar brand="CheckHouse" right>
    <NavItem href="/findAssistance">Find Assistance</NavItem>
    <NavItem href="/assist">Assist</NavItem>
    <NavItem href="/housing">Housing</NavItem>
    <NavItem href="/requests">Requests</NavItem>
    <NavItem href="/rentals">Rentals</NavItem>
    <NavItem href="/review">Reviews</NavItem>
    <NavItem href="/createHome">Post</NavItem>
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
