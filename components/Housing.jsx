import React, { Component } from 'react'
import { db, auth } from '~/fire'

export default class Housing extends Component {
  constructor(){
    super()
    this.state = {
      houses: {}
    }
  }

  componentDidMount() {
    let houses = db.collection('housing').doc("yN3TNjJJs4mP4rk4fGis")
    console.log('housing,', houses)
  }

  render(){
    return(
      <div>
        <h1>housing</h1>
      </div>
    )
  }
}
