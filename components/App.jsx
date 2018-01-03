import React, { Component } from 'react';
import firebase, { auth } from '~/fire';
import Routes from './Routes';
import NavBar from './Navbar';

export default class App extends Component {
  constructor(props) {
    super();
    this.state = {
      user: {},
      userEmail: '',
      uid: ''
    };
  }

  componentDidMount() {
    this.unsubscribe = auth.onAuthStateChanged(user =>
      this.setState({
        user
      })
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <NavBar />
        <Routes />
      </div>
    );
  }
}
