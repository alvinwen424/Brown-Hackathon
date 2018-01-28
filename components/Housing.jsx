import React, { Component } from 'react';
import { db, auth } from '~/fire';
import { Link } from 'react-router-dom';
import '~/public/housing.css';

export default class Housing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houses: []
    };
  }

  componentDidMount() {
    db
      .collection('housing')
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
                  <Link to={`/home/${id}`}>
                    <div className="priceInfo">
                      {home.Price}
                    </div>
                    <div className="roomInfo">
                      Bedrooms: {home.Rooms} Restrooms: {home.Restroom}
                    </div>
                    <div className="addrInfo">
                      {home.Street} {home.City} {home.State}
                    </div>
                    <div className="userInfo">
                      {home.userEmail}
                    </div>
                    <div className="picInfo" />
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
