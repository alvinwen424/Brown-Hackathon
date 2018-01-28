import React, { Component } from 'react'
import { db, storage, auth } from '~/fire'

export default class CreateHome extends Component {
  constructor() {
    super()
    this.state ={
      file: {}
    }
  }

  onChange = (e) => {
    this.setState({file: e.target.files[0]})
    console.log('file', e.target.files[0] )
  }

  onSubmit = (e) => {
    let { file } = this.state
    e.preventDefault()
    let storageRef = storage.ref()
    storageRef.child(`/images/${file.name}`).put(file).then((snapshot) => {
       console.log('uploaded a file')
    })
  }

  render (){
    return(
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="file" onChange={this.onChange} />
          <button type="submit">Upload</button>
        </form>
      </div>
    )
  }
}
