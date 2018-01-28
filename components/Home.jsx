import React from 'react';
import '~/public/home.css';
import {
  Row,
  Col,
  Card,
  Input,
  Icon,
  MediaBox,
  Button
} from 'react-materialize';

export default class Home extends React.Component {
  componentDidMount() {
    $('.parallax').parallax();
  }
  render() {
    return (
      <div>
        <div className="video">
          <video preload="auto" autoPlay loop poster="/images/work.jpg">
            <source type="video/mp4" src="/video/work.mp4" />
          </video>
        </div>
        <div className="wrapper">
          <div className="landing-banner">
            <h4 className="text-darken-3 lighten-3 text-parallex">
              Are you an incoming student to universities in Providence? <br />Are
              you an international student?<br />We know it's damn hard to find
              good houses when you're not around here! <br />
              Check out houses you're interested in as if you were actually
              here,
              <br />plus make some good friends.
              <br />
            </h4>
            <h2 className="header">
              Check House! <br />
              Ask help to students already living in Providence to become your
              one day realtor!
              <br />
            </h2>
            <br />

            <Button className="mainLogin" waves="light" node="a" href="/login">
              Log In
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
