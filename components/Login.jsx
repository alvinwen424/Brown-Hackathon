import React, { Component } from 'react';
import '~/public/register.css';
import { Button, Row, Col, Card, Input } from 'react-materialize';
import LoaderButton from './LoaderButton';
import { db, auth } from '~/fire';
import history from '../history';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      university: '@brown.edu',
      isLoading: false
    };
  }

  handleInput = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  validateInput = () => {
    return this.state.password.length > 0 && this.state.email.length > 0;
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.setState({ isLoading: true });
    let email = this.state.email + this.state.university;
    console.log(email);
    auth
      .signInWithEmailAndPassword(email, this.state.password)
      .then(currentUser => {
        if (auth.currentUser.emailVerified) {
          history.push('/');
        } else {
          alert('Your email has to be verified! Check your email!');
          this.setState({ isLoading: false });
        }
      })
      .catch(err => {
        alert(`${err}`);
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
          <Card className="blue-text" textClassName="blue-text" title="Log In">
            <form onSubmit={this.handleSubmit}>
              <Row>
                <Input
                  autoFocus
                  name="email"
                  offset="m1"
                  s={6}
                  m={5}
                  className="blue-text"
                  label="Email"
                  value={this.state.email}
                  validate
                  onChange={this.handleInput}
                />
                <Input
                  s={6}
                  m={5}
                  name="university"
                  type="select"
                  defaultValue="1"
                  onChange={this.handleInput}
                >
                  <option value="@brown.edu">@brown.edu</option>
                  <option value="@jwu.edu">@jwu.edu</option>
                  <option value="@risd.edu">@risd.edu</option>
                </Input>
              </Row>
              <Row>
                <Input
                  name="password"
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
                <Col
                  offset="s2 m1 l3"
                  s={12}
                  m={8}
                  l={10}
                  className="blue-text"
                >
                  <LoaderButton
                    type="submit"
                    waves="light"
                    className="blue white-text"
                    disabled={!this.validateInput()}
                    isLoading={this.state.isLoading}
                    text="Login"
                    loadingText="Logging in..."
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
