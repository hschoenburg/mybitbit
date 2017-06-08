
import React, { Component,  PropTypes }  from 'react';

import './App.scss';  

import User from './User'

import Recipients from './Recipients'

class App extends Component {  
  constructor() {
    super();

    this.state = {
      jwt: '',
      user_id: ''
    }
  }

  //TO DO Save JWT in Local Storage
  //$window.sessionStorage.accessToken = response.body.access_token;
  //Then don't load Login/Signup button if Token is valid.
  //Maybe just run an API check on the token?

  updateAuthData(auth) {
    this.setState(Object.assign({}, this.state, auth))
  }
    

  render() {
    let Recip;
    if(this.state.user_id) {
      Recip = (
        <Recipients userId={this.state.user_id} token={this.state.jwt}/>
      )
    }
    return (
      <div className='wrapper'>
        <p> Ok lets get this party started</p>
        <p>user_id: {this.state.user_id}</p>
        <p>jwt: { this.state.jwt} </p>
        <User userId={this.state.user_id} updateAuthData={this.updateAuthData.bind(this)} />
        {Recip}
      </div>
    );
  }
}
export default App;


