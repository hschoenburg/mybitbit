import React, { Component,  PropTypes }  from 'react';
import 'whatwg-fetch'


class RecipientsForm extends Component {  

  constructor(props) {
    super(props)

		this.state = {
			name: '',
      phone: '',
      email: ''
		}
			

  	this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    var that = this;
    fetch('/recipients', {
      method: 'POST',
      headers: {
          'x-api-token': this.props.token,
          'Content-Type': 'application/json'
        },
      body: JSON.stringify({ recipient: this.state })

    }).then(function(response){
      console.log(response);
      if(response.ok) {
        // TODO pushing the entire state array feels ugly......
        that.props.pushNewRecipient(that.state)
      }
    }).catch(function(err) {
      console.log(err);
      return false;
    })
        
  }


  render() {
    return (
    <div className='recipients-form'>
      <p>Here is the Form!</p>
			<form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" name='name' value={this.state.name} onChange={this.handleChange} />
        </label>

        <label>
          Email:
          <input type="text" name='email' value={this.state.email} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
    )

  }
}

export default RecipientsForm
