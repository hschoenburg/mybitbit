
import React, { Component,  PropTypes }  from 'react';

import './App.scss';  

import User from './User'

import Recipients from './Recipients'

class App extends Component {  
  constructor() {
    super();

    this.state = {
      jwt: '',
      userId: ''
    }
  }

  componentWillMount() {
    // Need to rethink/rebuild login flow
    // Persist token in sessionStorage,
    // or query for profile data from server... probably not
    // anyway figure it out later


    var previousToken = window.sessionStorage.getItem('bitbitToken')
    var userId  = window.sessionStorage.getItem('bitbitUserId')

    this.setState({jwt: previousToken, userId: userId})


  }

  //TO DO Save JWT in Local Storage
  //$window.sessionStorage.accessToken = response.body.access_token;
  //Then don't load Login/Signup button if Token is valid.
  //Maybe just run an API check on the token?

  updateAuthData(auth) {
    window.sessionStorage.setItem('bitbitToken', auth.jwt)
    window.sessionStorage.setItem('bitbitUserId', auth.userId)
    this.setState(Object.assign({}, this.state, auth))
  }

  logoutUser() {
    window.sessionStorage.clear();
    this.setState({jwt: '', userId: ''})
  }
    

  render() {
    let Recip;
    if(this.state.userId) {
      Recip = (
        <Recipients userId={this.state.userId} token={this.state.jwt}/>
      )
    }
    return (
      <div className='wrapper'>
        <p> Ok lets get this party started</p>
        <p>userId: {this.state.userId}</p>
        <p>jwt: { this.state.jwt} </p>
        <User logoutUser={this.logoutUser.bind(this)} userId={this.state.userId} updateAuthData={this.updateAuthData.bind(this)} />
        {Recip}
      </div>
    );
  }
}
export default App;


