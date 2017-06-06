import React, { Component,  PropTypes }  from 'react';

class UserProfile extends Component {  

  render() {
    return (
      <div className='wrapper'>
        <p>Hello={this.props.profileData.name}</p>
        <img src={this.props.profileData.thumbnail}/>
      </div>
    )
  }
}

export default UserProfile;
