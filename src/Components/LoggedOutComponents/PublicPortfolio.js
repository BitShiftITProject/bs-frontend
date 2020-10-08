import React, { Component } from 'react'
import { getUserPortfolios, getPortfolioPages } from '../../Backend/Fetch'
import Loading from '../CommonComponents/Loading'
import PublicSidebar from './PublicSidebar'
import SectionsList from '../Sections/SectionsList'

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

  async componentDidMount() {
    const params = this.getParams()

    this.setState({ pageIndex: params.page })

    // Get the actual array of the user's portfolios
    const portfolios = await getUserPortfolios(params.username)

    if (portfolios) {
      if (portfolios.length > params.portfolio) {
        this.setState({ portfolioDetails: portfolios[params.portfolio] })

        // Get the array of pages of the portfolio
        const portfolioId = portfolios[params.portfolio].id

        // GET methods already return the JSON-parsed response
        // so getPortfolioPages should either return null or an array of pages
        const pages = await getPortfolioPages(portfolioId)

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
    if (this.state.portfolioPages) {
      const sections = this.state.portfolioPages[this.getParams().page].content.sections
      const pageContent = <SectionsList sections={sections} />

      return (
        // Display sidebar with pages data and section content
        <PublicSidebar
          pages={this.state.portfolioPages}
          content={<div id='sections'>{pageContent}</div>}
        />
      )
    }
    // If portfolioDetails is null we are still fetching the portfolio
    // We don't have to be worried about getting stuck since if getPortfolio() returns null
    // Then it automatically redirects to /publicfailed
    else {
      return (
        <div style={{ height: '100vh' }}>
          <Loading vertical />
        </div>
      )
    }
  }
}

export default PublicPortfolio
