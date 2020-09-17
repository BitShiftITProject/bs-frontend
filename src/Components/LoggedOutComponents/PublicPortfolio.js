import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom'
import { BACKEND, USERS, PORTFOLIOS } from '../../Endpoints'

class PublicPortfolio extends Component {
  // Store the details of a portfolio so that we can use it later
  state = { portfolioDetails: null }

  // Gets the url parameters
  getParams = () => {
    return {
      username: this.props.match.params.username,
      portfolio: this.props.match.params.portfolio,
      page: this.props.match.params.page
    }
  }

  // Pass in the parameters from getParams() to fetch the portfolio from a given user
  // Returns the whole portfolio data structure if successful or null if failed
  getPortfolio = async (params) => {
    // Fetch the user from the params argument
    return fetch(BACKEND + USERS + '/' + params.username)
      .then((response) => {
        // If we get a response then turn it into a JSON data structure
        if (response.ok) {
          return response.json()
        }
        // otherwise return null
        else {
          return null
        }
      })
      .then((user) => {
        // If we didn't get a response from the last part then return null
        if (user == null) {
          return null
        }
        // Otherwise we have a user so we need to get the portfolio
        else {
          // If the user has the specified portfolio index
          if (user.portfolios.length > params.portfolio) {
            // Fetch the portfolio from the ID
            console.log(user.portfolios[params.portfolio])
            return fetch(BACKEND + PORTFOLIOS + '/' + user.portfolios[params.portfolio]).then(
              (portfolioResponse) => {
                // If we get a response, turn it into a JSON and return it
                if (portfolioResponse.ok) {
                  return portfolioResponse.json()
                }
                // Otherwise return null
                else {
                  return null
                }
              }
            )
          }
          // If the user does not have the specified portfolio, return null
          else {
            return null
          }
        }
      })
  }

  async componentDidMount() {
    let params = this.getParams()
    let portfolio = await this.getPortfolio(params)

    // If we can't find the portfolio, redirect to /publicfailed
    if (portfolio == null) {
      //   window.location.href = '/publicfailed'
    }
    // We have found a corresponding portfolio so set the state to store that data
    else {
      this.setState({ portfolioDetails: portfolio })
    }
  }

  render() {
    // If the portfolioDetails does not equal null then we have found one
    if (this.state.portfolioDetails != null) {
      return (
        <div id='portfolio_content'>
          <h1>{this.state.portfolioDetails.title}</h1>
          <p>{this.state.portfolioDetails.pages.content}</p>
        </div>
      )
    }
    // If portfolioDetails is null we are still fetching the portfolio
    // We don't have to be worried about getting stuck since if getPortfolio() returns null
    // Then it automatically redirects to /publicfailed
    else {
      return <p>loading</p>
    }
  }
}

export default PublicPortfolio
