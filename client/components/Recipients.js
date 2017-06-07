import React, { Component,  PropTypes }  from 'react';

import RecipientsList from './RecipientsList'
import RecipientsForm from './RecipientsForm'
import update from 'immutability-helper'

class Recipients extends Component {  
  constructor() {
    super();
    this.state = {
      recipients: []
    }
  }

  pushNewRecipient(recipient) {
    var newRecipients = update(this.state.recipients, {$push: [recipient]})
    this.setState({recipients: newRecipients})
  }

  render() {
    return (
      <div className='recipients'>
        <RecipientsForm user_id={this.props.user_id} token={this.props.token} pushNewRecipient={this.pushNewRecipient.bind(this)}/>
        <RecipientsList recipients={this.state.recipients}/>
      </div>
    )
  }
}


export default Recipients
