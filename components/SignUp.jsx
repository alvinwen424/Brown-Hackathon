import React, { Component } from 'react';
import SignUp from './SignUp';
import '~/public/signup.css';
import { Button, Row, Col, Card, Input, Icon } from 'react-materialize';
import LoaderButton from './LoaderButton';

export default class SignUpContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
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
      this.state.password.length > 0 &&
      this.state.email.length > 0
    );
  };
  handleSubmit = evt => {
    evt.preventDefault();
    this.setState({ isLoading: true });
    const credentials = {
      email: evt.target.email.value,
      password: evt.target.password.value,
      name: evt.target.name.value
    };
    this.props.signup(credentials, this.props.history).catch(e => {
      alert(e);
      this.props.whoami();
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
                  name="name"
                  offset="m1"
                  className="blue-text"
                  s={12}
                  m={10}
                  label="Name"
                  validate
                  value={this.state.firstname}
                  onChange={this.handleInput}
                >
                  <Icon className="blue-text">account_circle</Icon>
                </Input>
              </Row>
              <Row>
                <Input
                  name="email"
                  offset="m1"
                  id="email"
                  s={12}
                  m={10}
                  className="blue-text"
                  label="Email"
                  id="email"
                  validate
                  value={this.state.email}
                  type="email"
                  onChange={this.handleInput}
                >
                  <Icon className="blue-text">email</Icon>
                </Input>
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
                >
                  <Icon className="blue-text">vpn_key</Icon>
                </Input>
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
