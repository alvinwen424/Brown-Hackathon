import React, { Component } from 'react';
import firebase, { auth } from '~/fire';

export default class Checkout extends Component {
  constructor(props) {
    super();
    this.state = {
      currentUser: "",
    };
  }

  componentDidMount(){
    //This spot is is to load the coupons being purchased from firebase
    //Scan through firestore looking for the users checked out
    //we can access the current user using firebase.auth.currentUser, no need to pass as props
    console.log('currentUser', firebase.auth().currentUser)
  }


  render() {
    return (
      <div>
      </div>
    );
  }
}
