// Dependencies
 import React from 'react';  
 import ReactDOM from 'react-dom';

 // Components
import App from './components/App.jsx';

 // Styles
import './index.scss';

ReactDOM.render(<App />, document.getElementById('app-root'));  


var hello = require('hellojs')
var request = require('superagent')
var $ = require('jquery')

$(document).ready(function() {

  $('#omg').click(function(e) { console.log('yoyoyo') })


  hello.init({
    facebook: "1754938408152723"
    }, {
    redirect_uri: 'http://localhost:3000'
  })

  $('#fb-login').click(function(e) {
    e.preventDefault();
    hello('facebook').login()

  })

  hello.on('auth.login', function(auth) {
    hello(auth.network).api('me').then(function(profile) {
      profile.facebook_id = profile.id
      profile.token = auth.authResponse.access_token
      console.log(profile)
      request
        .post('/auth/facebook')
        .set('Accept', 'application/json')
        .send({
          profile: profile
        })
        .end(function(err, res) {
          console.log(res);
        })
    })

  })
})
