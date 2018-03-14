import React, { Component } from 'react';
import firebase, { auth } from '~/fire';
import stripePackage from 'stripe'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
const stripeKey = "pk_test_3p6Ar7jZqmCzwQ4uA5WQdWR7"

const stripe = stripePackage(stripeKey)

const CURRENCY = 'EUR';

const fromEuroToCent = amount => amount * 100;

const successPayment = data => {
  alert('Payment Successful');
};

const errorPayment = data => {
  alert('Payment Error');
};

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
  onToken = (amount, description) => (token) => {
    stripe.charges.create({amount}).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  render() {
    return (
      // ...
      <StripeCheckout
        token={this.onToken}
      />
    )
  }
}



/*
  onToken = (amount, description) => token => {
    axios.post('/save-stripe-token',
      {
        description,
        source: token.id,
        currency: CURRENCY,
        amount: fromEuroToCent(amount)
      })
      .then(successPayment)
      .catch(errorPayment);
  }
  render() {
    const amount = 30
    const description = "testing payment"
    return (
      <div>
        <stripeCheckout
          onToken = {this.onToken(amount, description)}
          stripeKey = "sk_test_3plmyXo2CiTj60tpOh1g65N1"
        />
      </div>
    );
  }*/
