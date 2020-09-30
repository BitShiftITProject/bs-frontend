import React, { Component } from 'react'
// import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom'
// import { BACKEND, USERS, PORTFOLIOS } from '../../backend/Endpoints'
import { getUserPortfolios, getPortfolioPages } from '../../Backend/Fetch'

class PublicPortfolio extends Component {
  // Store the details of a portfolio so that we can use it later
  state = { portfolioDetails: null, portfolioPages: null, pageIndex: 0 }

  // Gets the url parameters
  getParams = () => {
    return {
      username: this.props.match.params.username,
      portfolio: this.props.match.params.portfolio,
      page: this.props.match.params.page
    }
  }

  // // Pass in the parameters from getParams() to fetch the portfolio from a given user
  // // Returns the whole portfolio data structure if successful or null if failed
  // getPortfolio = async (params) => {
  //   // Fetch the user from the params argument

  //   const user = await getPublicUser()

  //   if (!user) {
  //     return null
  //   } else {
  //     // If the user has the specified portfolio index
  //     if (user.portfolios.length > params.portfolio) {
  //       // Fetch the portfolio from the ID
  //       return fetch(BACKEND + PORTFOLIOS + '/' + user.portfolios[params.portfolio]).then(
  //         (portfolioResponse) => {
  //           // If we get a response, turn it into a JSON and return it
  //           if (portfolioResponse.ok) {
  //             return portfolioResponse.json()
  //           }
  //           // Otherwise return null
  //           else {
  //             return null
  //           }
  //         }
  //       )
  //     }
  //     // If the user does not have the specified portfolio, return null
  //     else {
  //       return null
  //     }
  //   }
  // }

  async componentDidMount() {
    const params = this.getParams()

    this.setState({ pageIndex: params.page })

    // Get all user portfolios
    const portfoliosResponse = await getUserPortfolios(params.username).then((response) =>
      response.ok ? response : null
    )

    if (portfoliosResponse) {
      // Get the actual array of the user's portfolios back from the response
      const portfolios = await portfoliosResponse.json()

      if (portfolios.length > params.portfolio) {
        this.setState({ portfolioDetails: portfolios[params.portfolio] })

        // Get the array of pages of the portfolio
        const portfolioId = portfolios[params.portfolio].id

        // GET methods already return the JSON-parsed response
        // so getPortfolioPages should either return null or an array of pages
        const pages = await getPortfolioPages(portfolioId)
        console.log(pages)

        if (pages) {
          this.setState({ portfolioPages: pages })
        }
      } else {
        window.location.href = '/publicfailed'
      }
    } else {
      window.location.href = '/publicfailed'
    }
  }

  render() {
    // If the portfolioDetails does not equal null then we have found one
    if (this.state.portfolioDetails) {
      return (
        <div id='portfolio_content'>
          {/*
           * PORTFOLIO TITLE
           */}
          <h1>{this.state.portfolioDetails.title}</h1>

          {/*
           * PORTFOLIO PAGES MENU / SIDEBAR
           * // TODO: Show all page titles in sidebar and be able to select pages
           */}

          <div></div>

          {/*
           * PORTFOLIO PAGE CONTENT
           * // TODO: Show content according to selected page
           * // can use setPageIndex
           */}
          {this.state.portfolioPages && (
            <p>{JSON.stringify(this.state.portfolioPages[this.state.pageIndex])}</p>
          )}
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
