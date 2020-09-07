import React, { Component } from 'react'
import './ContactInfo.css'
import { TextField, FormControl, Button } from '@material-ui/core'

class ContactInfo extends Component {
  state = { number: '', email: '', address: '', github: '', linkedin: '' }

  handleClick = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    console.log('Contact Info:')
    console.log('Number:', this.state.number)
    console.log('Email:', this.state.email)
    console.log('Address:', this.state.address)
    console.log('GitHub:', this.state.github)
    console.log('LinkedIn:', this.state.linkedin)
  }

  render() {
    return (
      <div className='contact_info'>
        <FormControl onSubmit={this.handleSubmit}>
          {/* NOT SURE WHICH ONE WE WOULD USE OVERALL TO SIGN IN (email or username) SO BOTH IS INCLUDED FOR NOW */}
          <label htmlFor='contact_info__number'>Mobile Number:</label>
          <TextField
            id='contact_info__number'
            type='tel'
            placeholder='0000000000'
            name='number'
            value={this.state.number}
            onClick={this.handleClick}
            required
          />

          <label htmlFor='contact_info__email' className='contact_info__email'>
            Email:
          </label>
          <TextField
            id='contact_info__email'
            type='email'
            placeholder='email@domain.com'
            name='email'
            value={this.state.email}
            onClick={this.handleClick}
            required
          ></TextField>

          <label htmlFor='contact_info__address'> Address: </label>
          <TextField
            id='contact_info__address'
            type='text'
            placeholder='Address'
            name='address'
            value={this.state.address}
            onClick={this.handleClick}
            required
          />

          <label htmlFor='contact_info__github'> Github: </label>
          <TextField
            id='contact_info__github'
            type='url'
            name='github'
            value={this.state.github}
            onClick={this.handleClick}
          />

          <label htmlFor='contact_info__linkedin'> Linkedin: </label>
          <TextField
            id='contact_info__linkedin'
            type='url'
            name='linkedin'
            value={this.state.linkedin}
            onClick={this.handleClick}
          />

          <Button
            className='contact_info__button'
            type='submit'
            variant='contained'
            color='primary'
          >
            SAVE DETAILS
          </Button>
        </FormControl>
      </div>
    )
  }
}

export default ContactInfo
