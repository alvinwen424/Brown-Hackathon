import React, { Component } from 'react';
import { db, auth } from '~/fire';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-materialize'
import '~/public/housing.css';

export default class Assist extends Component {
  constructor() {
    super();
    this.state = {
      houses: []
    };
  }

  componentDidMount() {
    db
      .collection('assist')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          doc.data().id = doc.id;
          this.setState({ houses: [...this.state.houses, doc] });
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }

  render() {
    let { houses } = this.state;
    return (
      <div className="houseList">
        <div className="listContainer">
          {houses.length &&
            houses.map((el, idx) => {
              let home = el.data();
              let id = el.id;

              return (
                <div
                  className={idx % 2 == 0 ? 'homeInfo grayBack' : 'homeInfo'}
                  key={id}
                >
                  <Link to={`/assist/${id}`}>
                    <div className="priceInfo">
                      {home.Payout}
                    </div>
                    <div className="addrInfo">
                      {home.Street} {home.City} {home.State}
                    </div>
                  </Link>
                  <Modal
                    header={home.Street}
                    trigger={<Button>View</Button>}>
                    <div>
                      {home.Description}
                    </div>
                    <div>
                      {home.Payout} will be your reward!
                    </div>
                  </Modal>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
