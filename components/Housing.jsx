import React, { Component } from 'react'
import { db, auth } from '~/fire'

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
        this.setState({houses: [...this.state.houses, doc.data()]})
        console.log('doc', doc.data(), doc.id)
      })
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    })
  }

  render(){
    let { houses } = this.state
    console.log('homes', houses)
    return(
      <div>
        <h1>housing</h1>
        { houses.length && houses.map((home) => {
          return (
            <div>
              <h3>{home.Street} {home.City} {home.State}</h3>
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
