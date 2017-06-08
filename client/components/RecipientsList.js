import React, { Component,  PropTypes }  from 'react';

import Recipient from './Recipient'


class RecipientsList extends Component {  

  render() {
    let list = this.props.recipients.map((item) => {
      // TODO more elegant and collision resistant key scheme
      return <Recipient name={item.name} phone={item.phone} key={item.phone + item.name}/>
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
