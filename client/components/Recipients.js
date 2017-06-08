import React, { Component,  PropTypes }  from 'react';

import RecipientsList from './RecipientsList'
import RecipientsForm from './RecipientsForm'
import update from 'immutability-helper'
import 'whatwg-fetch'

class Recipients extends Component {  
  constructor() {
    super();
    this.state = {
      recipients: []
    }
  }

  componentDidMount() {
    console.log("mounted")
    // TODO that=this feels ugly. Pass a callback instead?
    var that = this;
    fetch('/recipients', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-token': this.props.token
      }
    }).then(function(response) {
      return response.json()
    }).then(function(data) {
      console.log(data);
      that.setState({recipients: data.recipients})
    }).catch(function(err) {
      console.log(err);
    })

  }

  pushNewRecipient(recipient) {
    var newRecipients = update(this.state.recipients, {$push: [recipient]})
    this.setState({recipients: newRecipients})
  }

  render() {

    console.log(this.props)
    console.log('recip render')
    return (
      <div className='recipients'>
        <RecipientsForm user_id={this.props.user_id} token={this.props.token} pushNewRecipient={this.pushNewRecipient.bind(this)}/>
        <RecipientsList recipients={this.state.recipients}/>
      </div>
    )
  }
}

export default Recipients
