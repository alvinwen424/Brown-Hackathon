import React, { Component } from 'react'
import { db, auth } from '~/fire'
import { Link } from 'react-router-dom'
export default class Housing extends Component {
  constructor(){
    super()
    this.state = {
      houses: []
    }
  }

  componentDidMount() {
   db.collection('housing').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        doc.data().id = doc.id
        this.setState({houses: [...this.state.houses, doc]})
      })
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    })
  }

  render(){
    let { houses } = this.state
    return(
      <div>
        <h1>housing</h1>
        { houses.length && houses.map((el) => {
          let home = el.data()
          let id = el.id
          return (
            <div key={id}>
              <Link to={`/home/${id}`}><h3>{home.Street} {home.City} {home.State}</h3></Link>
              <h4>Price: {home.Price}</h4>
              <h4>Bedrooms: {home.Rooms} </h4>
              <h4>Restrooms: {home.Restroom}</h4>
            </div>
          )
        })}
      </div>
    )
  }
}
