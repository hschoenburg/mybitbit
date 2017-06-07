import React, { Component,  PropTypes }  from 'react';

class RecipientsForm extends Component {  

  constructor(props) {
    super(props)

		this.state = {
			name: '',
			phone: ''
		}
			

  	this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

		handleChange(event) {
			this.setState({[event.target.name]: event.target.value})
		}

		handleSubmit(event) {
			console.log('Form submitted!' + this.state)
			event.preventDefault();
      this.props.pushNewRecipient(this.state)
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
          Phone Number:
          <input type="text" name='phone' value={this.state.phone} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
    )
  }
}

export default RecipientsForm
