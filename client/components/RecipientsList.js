import React, { Component,  PropTypes }  from 'react';

import Recipient from './Recipient'


class Friends extends Component {  

  render() {
    let list = this.props.recipients.map((item) => {
      // TODO more elegant and collision resistant key scheme
      return <Recipient recipient={item}  key={item.name+item.id} token={this.props.token} />
    })
    return (
    <div className='recipients-list'>
      <p>Here is the Recipients list</p>
      <ul>
        {list}
      </ul>
    </div>
    )

  }
}

export default RecipientsList
