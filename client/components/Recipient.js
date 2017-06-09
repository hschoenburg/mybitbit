import React, { Component,  PropTypes }  from 'react';
import 'whatwg-fetch'

class Recipient extends Component {  


  constructor(props) {
    super(props)

    this.sendVerif = this.sendVerif.bind(this)
  }


  sendVerif(e){
    e.preventDefault()

    fetch('/verifs/send', {
      method: 'POST',
      headers: {
          'x-api-token': this.props.token,
          'Content-Type': 'application/json'
        },
      body: JSON.stringify({ recipient_id: this.props.recipient.id})

    }).then(function(response){
      console.log(response);
      if(response.ok) {
        // TODO pushing the entire state array feels ugly......
        //that.props.pushNewRecipient(that.state)
      }
    }).catch(function(err) {
      console.log(err);
      return false;
    })
        
  }

  render() {
    var verified = this.props.recipient.email_verif ? true : false;

    console.log(this.props.recipient)
    let verif_button;

    if(!this.props.recipient.email_verif && this.props.recipient.email) {
      verif_button = (
        <div>
          <span> Verified: False </span>
          <a href='#' onClick={this.sendVerif.bind(this)}>
            Send Verif Email
          </a>
        </div>
        )
    }
    return (
      <li>
        <p>
          {'Name: '+this.props.recipient.name + ' email:  ' + this.props.recipient.email + ' Verified: '+verified}
        </p>
        {verif_button}


      </li>
    )
  }
}

export default Recipient
