import React, { Component } from 'react'
import './Login.css'
import {BACKEND, AUTHENTICATE} from '../../Endpoints'
import { TextField, FormControl, Button, Checkbox } from '@material-ui/core'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', username: '', password: '' };
    }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
      //TODO: THIS FUNCTION ISN'T CALLED WHY AAAAAAAAA
    e.preventDefault()

    const details = {
        username: this.state.username, 
        password: this.state.password, 
    };

    fetch(BACKEND + AUTHENTICATE, 
        {
            method: "POST",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(details)
        }
    )
    .then((response) => {
        if(response.ok){
            window.sessionStorage.accessToken = response.body.access_token;
            // TODO: Check if this actually works for redirecting
            window.location.href = "/";
        }else {
            //TODO: Redirect to failed to login page
        }
    })

    console.log('Login:')
    console.log('Email:', this.state.email)
    console.log('Username:', this.state.username)
    console.log('Password:', this.state.password)
  }

  render() {
    return (
      <div className='Login'>
        <FormControl onSubmit={this.handleSubmit}>
          <label htmlFor='login__username' className='login__username'>
            {' '}
            Username:{' '}
          </label>
          <TextField
            id='login__username'
            type='text'
            placeholder='Username'
            name='username'
            value={this.state.username}
            onChange={this.handleChange}
            required
          ></TextField>

          <label htmlFor='login__password' className='login__password'>
            {' '}
            Password:{' '}
          </label>
          <TextField
            id='login__password'
            type='password'
            placeholder='**********'
            name='password'
            value={this.state.password}
            onChange={this.handleChange}
            required
          ></TextField>

          <Button className='login__button' type='submit' variant='contained' color='primary'>
            {' '}
            LOG IN
          </Button>

          <label htmlFor='login__remember'> Remember Me </label>

          <Checkbox
            id='login__remember'
            className='login__remember'
            defaultChecked
            color='primary'
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />

          {/* if Changeing forgot password brings us to a new page
                  <a href="#top" className="login__forgot_password"> Forgot your password? </a>*/}

          {/* if Changeing forgot password just brings a popup then the button itself wont be a link */}
          {/* <Button variant="contained" color="primary" className="login__forgot_password"> Forgot your password? </Button>  */}

          {/* if Changeing forgot password button is a link */}
          <Button
            className='login__forgot_password'
            variant='contained'
            color='default'
            href='/forgotpassword'
          >
            {' '}
            Forgot your password?{' '}
          </Button>
        </FormControl>
      </div>
    )
  }
}

export default Login
