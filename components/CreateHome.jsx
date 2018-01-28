import React, { Component } from 'react'
import { db, storage, auth } from '~/fire'

export default class CreateHome extends Component {
  constructor() {
    super()
    this.state ={
      files: [],
      imagePreviewUrl: [],
      info: ['Street', 'Apt', 'City', 'State', 'Price', 'Rooms', 'Restroom', 'Description', 'email']
    }
  }

  onChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    let { files, imagePreviewUrl } = this.state
    reader.onloadend = () => {
      this.setState({
        files: [...files, file],
        imagePreviewUrl: [...imagePreviewUrl, reader.result]
      });
    }
    reader.readAsDataURL(file)
  }

  onClick = (e) => {
  }

  onSubmit = (e) => {
    console.log(e.target.Street.value)
    let { files } = this.state
    let { email } = auth.currentUser
    let storageRef = storage.ref()
    e.preventDefault()
    storageRef.constructor.prototype.putFiles = function(files) {
      return Promise.all(files.map(function(files) {
        return storageRef.child(`/images/${email}/${files.name}`).put(files)
      }));
    }

    storageRef.putFiles(files).then(function(metadatas) {
      // Get an array of file metadata
      console.log('metaData', metadatas)
    }).catch(function(error) {
      console.error(error)
    });
  }

  render (){
    let { files, imagePreviewUrl } = this.state
    return(
      <div>
        <form onSubmit={this.onSubmit}>
          <label>
            Street:
            <input type="text" name="Street"/>
          </label>
          <input type="file" onChange={this.onChange} />
          <button type="submit">Upload</button>
        </form>
        {imagePreviewUrl && imagePreviewUrl.map(url => {
          return(
            <img src={url} onClick={() => this.onClick(url)} />
          )
        })}
      </div>
    )
  }
}
