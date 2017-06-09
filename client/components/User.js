
import React, { Component,  PropTypes }  from 'react';

import UserAuth from './UserAuth'
import UserProfile from './UserProfile'

class User extends Component {  
  constructor() {
    super();
    this.state = {
      profileData: {}
    }
  }

  updateProfileData(fb_profile) {
    this.setState(Object.assign({}, this.state, { profileData: fb_profile }))
  }

  updateAuthData(auth_response) {
    this.props.updateAuthData(auth_response)
  }

  render() {

    let userDetails;

    if(this.props.userId) {
      userDetails = (
        <div className='userDetails'>
          <UserProfile profileData={this.state.profileData}/>
        </div>
      )
    }


    return (
      <div className='user'>
        <p>Here is the User Details Box for User {this.props.userId}</p>
        {userDetails}
         <div className='userDetails'>
          <UserAuth userId={this.props.userId} updateProfileData={this.updateProfileData.bind(this)}
                    updateAuthData={this.updateAuthData.bind(this)}
                  />
        </div>

      </div>
    );
  }
}

export default User;
