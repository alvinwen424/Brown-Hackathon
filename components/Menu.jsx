import React, { Component } from 'react'

export default class Menu extends Component {

  onClick = (e) => {
   console.log(e.target)
   //filter for e.target.value through the menus (i.e korean, japanese etc.)
  }

  render () {
    //If you need user, user firebase.auth().currentUser
    return (
      <div className="menu" >
        <div>
          <h3>filter</h3>
          <h2>I Want...</h2>
          <form name="category" id="">
            <input type="radio" name="All" value="All" onClick={this.onClick} /> All<br />
            <input type="radio" name="All" value="Korean" onClick={this.onClick} /> Korean<br />
            <input type="radio" name="All" value="Japanese" onClick={this.onClick} /> Japanese<br />
            <input type="radio" name="All" value="American" onClick={this.onClick} /> American<br />
            <input type="radio" name="All" value="Mexican" onClick={this.onClick} /> Mexican<br />
            <input type="radio" name="All" value="Thai" onClick={this.onClick} /> Thai<br />
          </form>
          <h2>Distance from me</h2>
          <form name="distance" id="">
            <input type="radio" value="<0.2"/> less than 0.2 miles <br />
            <input type="radio" value="0.2 - 0.5"/> 0.2 - 0.5 miles <br />
            <input type="radio" value="0.5 - 0.75"/> 0.5 - 0.75 miles <br />
          </form>
        </div>
        <div>
          <h3>menu</h3>
        </div>
        <div>
          <h3>map</h3>
        </div>
      </div>
    )
  }
}
