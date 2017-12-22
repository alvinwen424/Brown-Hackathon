import React, { Component } from 'react';
import { auth } from '~/fire';
import { NavLink } from 'react-router-dom';
import { Navbar, NavItem, Dropdown, Modal } from 'react-materialize';

export default class NavBar extends Component {
  render() {
    return <Navbar brand="Ask Alvin" right />;
  }
}
