/* global $ */
import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import {
  Row,
  Col,
  Navbar,
  NavItem,
  Dropdown,
  Button,
  Icon,
  Modal
} from 'react-materialize';
// import { logout } from 'APP/app/reducers/auth';

export default class NavBar extends Component {
  validateActive(href) {
    return this.props.location.pathname === href;
  }

  renderLoginSignup() {
    return [
      <li key={1} className={this.validateActive('/login') ? 'active' : ''}>
        <NavLink to="/login">Login</NavLink>
      </li>
    ];
  }

  renderLogout() {
    return [
      <li key={1} className="blue-text">
        Welcome, {this.props.user.name} !
      </li>,
      <NavItem key={2} onClick={this.props.logout}>
        Logout
      </NavItem>,
      <Dropdown
        key={3}
        trigger={
          <li>
            <NavLink
              to="#!"
              onClick={() => {
                $('#fullstack-profile').modal('open');
              }}
            >
              <img
                key={3}
                src={this.props.user.photo}
                alt=""
                className="profile-photo circle"
              />
              <i className="material-icons right">arrow_drop_down</i>
            </NavLink>
          </li>
        }
      />,
      <Modal
        key={4}
        id="fullstack-profile"
        header={
          'Hello!' + this.props.user.name + ' from ' + this.props.user.cohort
        }
        bottomSheet
      >
        {this.props.user.photo}
      </Modal>
    ];
  }

  render() {
    return (
      <Navbar brand="Ask Alvin" right>
        <div className="col s8">
          {this.props.user ? this.renderLogout() : this.renderLoginSignup()}
        </div>
      </Navbar>
    );
  }
}