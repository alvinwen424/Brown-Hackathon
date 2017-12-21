import React, { Component } from 'react'
import database from '../fire/index.js'

export default class Hello extends Component {
  handleClick(evt) {
    evt.preventDefault()
    console.log('hello')

  }

  render() {
    return (
      <div>
        <h1> Hello this is your page </h1>
        <button type="button" onClick={this.handleClick}> Test Me! </button>
      </div>
    )
  }
}
