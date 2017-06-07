import React, { Component,  PropTypes }  from 'react';

import Recipient from './Recipient'


class RecipientsList extends Component {  

  render() {
    let list = this.props.recipients.map((item) => {
      return <Recipient name={item.name} phone={item.phone} key={item.phone}/>
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
