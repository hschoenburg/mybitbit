
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

  updateAuthData(auth) {
    this.setState(Object.assign({}, this.state, auth))
  }
    

  render() {
    return (
      <div className='wrapper'>
        <p> Ok lets get this party started</p>
        <p>user_id: {this.state.user_id}</p>
        <p>jwt: { this.state.jwt} </p>
        <User userId={this.state.user_id} updateAuthData={this.updateAuthData.bind(this)} />
        <Recipients userId={this.state.user_id} token={this.state.jwt}/>
      </div>
    );
  }
}
export default App;


