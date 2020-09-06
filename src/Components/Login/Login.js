import React from 'react'
import './Login.css'
import { TextField, FormControl, Button, Checkbox } from '@material-ui/core'

class Login extends Component {
  state = { email: '', username: '', password: '' }

  handleClick = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    console.log('Login:')
    console.log('Email:', this.state.email)
    console.log('Username:', this.state.username)
    console.log('Password:', this.state.password)
  }

  render() {
    return (
      <div className='Login'>
        <FormControl onSubmit={this.handleSubmit}>
          {/* NOT SURE WHICH ONE WE WOULD USE OVERALL TO SIGN IN (email or username) SO BOTH IS INCLUDED FOR NOW */}
          <label htmlFor='login__email' className='login__email'>
            {' '}
            Email:{' '}
          </label>
          <TextField
            id='login__email'
            type='email'
            placeholder='email@domain.com'
            name='email'
            value={this.state.email}
            onClick={this.handleClick}
            required
          ></TextField>

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
            onClick={this.handleClick}
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
            onClick={this.handleClick}
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

          {/* if clicking forgot password brings us to a new page
                  <a href="#top" className="login__forgot_password"> Forgot your password? </a>*/}

          {/* if clicking forgot password just brings a popup then the button itself wont be a link */}
          {/* <Button variant="contained" color="primary" className="login__forgot_password"> Forgot your password? </Button>  */}

          {/* if clicking forgot password button is a link */}
          <Button
            className='login__forgot_password'
            variant='contained'
            color='default'
            href='#top'
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
