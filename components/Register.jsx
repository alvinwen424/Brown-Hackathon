import React, { Component } from 'react';
import '~/public/register.css';
import { Button, Row, Col, Card, Input } from 'react-materialize';
import LoaderButton from './LoaderButton';
import { db, auth } from '~/fire';
import history from '../history';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmpassword: '',
      dob: '',
      referrer: '',
      pickup: '',
      isLoading: false
    };
  }

  handleInput = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  validateInput = () => {
    return (
      this.state.firstname.length > 0 &&
      this.state.lastname.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.dob.length > 0 &&
      this.state.confirmpassword.length > 0 &&
      this.state.password === this.state.confirmpassword
    );
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.setState({ isLoading: true });
    auth
      .createUserWithEmailAndPassword(
        evt.target.email.value,
        evt.target.password.value
      )
      .then(newUser => {
        db
          .collection('users')
          .doc(newUser.uid)
          .set({
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            dob: this.state.dob,
            pickup: this.state.pickup,
            referrer: this.state.referrer,
            uid: newUser.uid
          })
          .then(result => {
            newUser.sendEmailVerification();
            alert(`Verification email sent to ${this.state.email}`);
            history.push('/');
          });
      })
      .catch(err => {
        alert('Sorry, your email already exists.');
        this.setState({ isLoading: false });
      });
  };

  render() {
    return (
      <Row>
        <Col
          offset="m2 l4"
          s={12}
          m={8}
          l={4}
          className="grid-example blue-text"
        >
          <Card className="blue-text" textClassName="blue-text" title="Sign Up">
            <form onSubmit={this.handleSubmit}>
              <Row>
                <Input
                  autoFocus
                  name="firstname"
                  offset="m1"
                  className="blue-text"
                  s={12}
                  m={10}
                  label="First Name"
                  validate
                  value={this.state.firstname}
                  onChange={this.handleInput}
                />
              </Row>
              <Row>
                <Input
                  autoFocus
                  name="lastname"
                  offset="m1"
                  className="blue-text"
                  s={12}
                  m={10}
                  label="Last Name"
                  validate
                  value={this.state.lastname}
                  onChange={this.handleInput}
                />
              </Row>
              <Row>
                <Input
                  name="email"
                  offset="m1"
                  id="email"
                  s={12}
                  m={10}
                  className="blue-text"
                  label="Email Address"
                  id="email"
                  validate
                  value={this.state.email}
                  type="email"
                  onChange={this.handleInput}
                />
              </Row>
              <Row>
                <Input
                  name="password"
                  id="password"
                  offset="m1"
                  className="blue-text"
                  type="password"
                  label="password"
                  value={this.state.password}
                  s={12}
                  m={10}
                  onChange={this.handleInput}
                />
              </Row>
              <Row>
                <Input
                  name="confirmpassword"
                  id="confirmpassword"
                  offset="m1"
                  className="blue-text"
                  type="password"
                  label="Confirm Password"
                  value={this.state.confirmpassword}
                  s={12}
                  m={10}
                  onChange={this.handleInput}
                />
              </Row>
              <Row>
                <Input
                  name="dob"
                  offset="m1"
                  id="dob"
                  s={12}
                  m={10}
                  className="blue-text"
                  label="Date of Birth"
                  id="dob"
                  validate
                  value={this.state.dob}
                  onChange={this.handleInput}
                />
              </Row>
              <Row>
                <Input
                  name="referrer"
                  offset="m1"
                  s={12}
                  m={10}
                  className="blue-text"
                  label="Referred from"
                  id="referrer"
                  validate
                  value={this.state.referrer}
                  onChange={this.handleInput}
                />
              </Row>
              <Row>
                <Input
                  name="pickup"
                  offset="m1"
                  id="pickup"
                  s={12}
                  m={10}
                  className="blue-text"
                  label="pickup"
                  validate
                  value={this.state.pickup}
                  onChange={this.handleInput}
                />
              </Row>
              <Row>
                <Col
                  offset="s2 m1 l3"
                  s={12}
                  m={8}
                  l={10}
                  className="blue-text"
                >
                  <LoaderButton
                    type="submit"
                    isLoading={this.state.isLoading}
                    text="Sign up"
                    loadingText="Signing up..."
                    disabled={!this.validateInput()}
                    waves="light"
                    className="blue white-text"
                  />
                </Col>
              </Row>
            </form>
          </Card>
        </Col>
      </Row>
    );
  }
}
