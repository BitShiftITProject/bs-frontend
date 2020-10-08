import React, { Component } from 'react'
// import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom'

import {
  TextField,
  Button,
  //   Checkbox,
  //   FormControlLabel,
  //   Grid,
  //   Avatar,
  Typography
  //   styled,
  //   withStyles
} from '@material-ui/core'

class PublicPortfolio extends Component {
  state = { search: '' }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    window.location.href = '/public/' + this.state.search + '/0/0'
  }

  render() {
    const content = (
      <div>
        <Typography component='h1' variant='h5'>
          Sorry! We could not find the specified portfolio
        </Typography>
        <label>Search for another user's portfolio below</label>
        <form onSubmit={this.handleSubmit}>
          <TextField
            variant='filled'
            margin='normal'
            required
            fullWidth
            id='search'
            label='Username'
            name='search'
            autoFocus
            onChange={this.handleChange}
          />
          <Button type='submit' fullWidth variant='contained' color='primary'>
            Search
          </Button>
        </form>
      </div>
    )

    return content
  }
}

export default PublicPortfolio
