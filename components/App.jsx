import React, { Component } from 'react';
import firebase, { auth } from '~/fire';
import { Routes } from './Routes';
import { NavBar } from './Navbar';
import SimpleMap from './SimpleMap';

export default class App extends Component {
  constructor(props) {
    super();
    this.state = {
      currentUser: {},
      email: '',
      uid: ''
    };
  }

  componentDidMount() {
    this.unsubscribe = auth.onAuthStateChanged(currentUser =>
      this.setState({
        currentUser
      })
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <NavBar currentUser={this.state.currentUser} />
        <SimpleMap />
        <Routes currentUser={this.state.currentUser} />
      </div>
    );
  }
}
