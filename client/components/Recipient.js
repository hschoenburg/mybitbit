import React, { Component,  PropTypes }  from 'react';

class Recipient extends Component {  

  render() {
    return (
      <li>
        {this.props.name + ' ' + this.props.phone}
      </li>
    )
  }
}

export default Recipient
