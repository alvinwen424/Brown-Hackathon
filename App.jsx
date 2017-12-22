import React, { Component } from 'react';
import NavBar from './components/NavBar';
import firebase, { auth } from '~/fire';

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
      </div>
    );
  }
}
