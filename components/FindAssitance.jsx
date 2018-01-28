import React, { Component } from 'react';
import { db, auth } from '~/fire';
import { Row, Input } from 'react-materialize'
// import '~/public/housing.css';

export default class FindAssistance extends Component {
  constructor() {
    super();
    this.state = {
    };
  }



  render() {
    return (
      <div>
        <Row >
          <Input placeholder="Placeholder" label="Street Address" />
          <Input s={6} label="City" />
          <Input s={6} label="State"/>
          <Input type="Description" label="password" s={12} />
          <Input type="price" label="password" s={12} />
          <Input type="email" label="Email" s={12} />
        </Row>
      </div>
    );
  }
}
