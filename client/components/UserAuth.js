import React, { Component,  PropTypes }  from 'react';
import hello from 'hellojs';
import request from 'superagent';

class UserAuth extends Component {  
  constructor() {
    super(...arguments);

    hello.init({
      facebook: "1754938408152723"
      }, {
      redirect_uri: 'http://localhost:3000'
    })
  }

  fbLogoutUser(e) {
    // delete token from LocalStorage
    // and remove it from App.js using props function
    // this.props.logoutUser
  }

  fbAuthUser(e) {
    e.preventDefault();

    var profileUpdate = this.props.updateProfileData
    var authUpdate = this.props.updateAuthData

    hello.on('auth.login', function(auth) {
      var token = auth.authResponse.access_token
      hello(auth.network).api('me').then(function(profile) {
        var myProfile = profile;
        myProfile.facebook_id = profile.id.toString()
        delete myProfile.id
        myProfile.facebook_token = token
        profileUpdate(myProfile)

        request
          .post('/auth/facebook')
          .set('Accept', 'application/json')
          .send({
            profile: myProfile
          })
          .end(function(err, res) {
            authUpdate({jwt: res.body.token, user_id: res.body.user_id})
          })
      })
    })

    hello('facebook').login()
  }


  render() {
    let Button;

    if(this.props.userId) {

      Button = (
        <div className='logout-button'>
          <a href='#' onClick={this.fbLogoutUser.bind(this)} >
            Logout
          </a>
        </div>
      )
    } else {
      Button = (
      <div className='login-button'>
        <a href='#' onClick={this.fbAuthUser.bind(this)} >
          Login
        </a>
      </div>
      )
    }

    return (
      Button
    );
  }
}

export default UserAuth;


