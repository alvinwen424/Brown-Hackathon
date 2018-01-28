import React, { Component } from 'react'
import { db, storage, auth } from '~/fire'

export default class CreateHome extends Component {
  constructor() {
    super()
    this.state ={
      file: []
    }
  }

  onChange = (e) => {
    this.setState({file: [...this.state.file, e.target.files[0]]})
    console.log('file', e.target.files[0] )
  }

  onSubmit = (e) => {
    let { file } = this.state
    let { email } = auth.currentUser
    let storageRef = storage.ref()
    e.preventDefault()
    storageRef.constructor.prototype.putFiles = function(files) {
      return Promise.all(files.map(function(file) {
        return storageRef.child(`/images/${email}/${file.name}`).put(file)
      }));
    }

    storageRef.putFiles(file).then(function(metadatas) {
      // Get an array of file metadata
      console.log('metaData', metadatas)
    }).catch(function(error) {
      // If any task fails, handle this
    });
    // let storageRef = storage.ref()
    // storageRef.child(`/images/${email}/${file.name}`).put(file).then((snapshot) => {
    //    console.log('uploaded a file')
    // })
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
