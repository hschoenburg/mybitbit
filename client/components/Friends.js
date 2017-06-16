import React, { Component,  PropTypes }  from 'react';

import Friend from './Friend'

import hello from 'hellojs';

class Friends extends Component {  

  constructor(props) {
    super(props)

    var redirect;
    if(NODE_ENV == 'production') {
      redirect = 'https://bitbit-staging.herokuapp.com'
    } else {
      redirect =  'http://localhost:3000'
    }

    hello.init({
      facebook: "1754938408152723"
    }, {
      redirect_uri: redirect
    })
  }

  fbHandler(data) {
    console.log('Calling handler')
    console.log(data);
  }

  getFriends() {
    console.log('get those friends')

    hello('facebook').api('me/friends?fields=name,id', {limit: 1000})

      .then(function(data) {
          console.log(data);
      })

  }



  render() {
    return (
    <div className='recipients-list'>
      <a href='#' onClick={this.getFriends}>Get Friends </a>
    </div>
    )
  }
}

export default Friends
