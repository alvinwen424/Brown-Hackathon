import React, { Component } from 'react';
import { db, auth } from '~/fire';

export default class SingleHome extends Component {
  constructor() {
    super();
    this.state = {
      info: {}
    };
  }
  componentDidMount() {
    db
      .collection('housing')
      .doc(this.props.match.params.id)
      .get()
      .then(snapshot => {
        this.setState({ info: snapshot.data() });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }
  render() {
    let home = this.state.info;
    return (
      <div key={this.props.match.params.id}>
        <h3>
          {home.Street} {home.City} {home.State}
        </h3>
        <h4>
          Price: {home.Price}
        </h4>
        <h4>
          Bedrooms: {home.Rooms}{' '}
        </h4>
        <h4>
          Restrooms: {home.Restroom}
        </h4>
        <h4>
          Description: {home.Description}
        </h4>
      </div>
    );
  }
}
