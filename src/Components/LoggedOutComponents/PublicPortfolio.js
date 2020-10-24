import React, { Component } from 'react'
import { getPortfolio, getPortfolioPages, patchPortfolio } from '../../Backend/Fetch'
import Loading from '../CommonComponents/Loading'
import PublicSidebar from './PublicSidebar'
import SectionsList from '../Sections/SectionsList'

class PublicPortfolio extends Component {
  // Store the details of a portfolio so that we can use it later
  state = { portfolioDetails: null, portfolioPages: null, pageIndex: 0 }

  // Gets the url parameters
  getParams = () => {
    return {
      portfolio: this.props.match.params.portfolio,
      page: this.props.match.params.page
    }
  }

  async componentDidMount() {
    const params = this.getParams()

    if (params.page) this.setState({ pageIndex: params.page })

    // Get the actual array of the user's portfolios
    const portfolio = await getPortfolio(params.portfolio)

    if (portfolio) {
      this.setState({ portfolioDetails: portfolio })

      // Retrieve pages by the sorted order if there is an order, but if there
      // isn't a page ordering then create one based on the response of
      // getPortfolioPages for the portfolio

      const pageOrder = portfolio.pageOrder

      getPortfolioPages(portfolio.id).then((pages) => {
        if (!pageOrder) {
          const patchDetails = { pageOrder: pages }
          patchPortfolio(portfolio.id, patchDetails)
        } else {
          pages.sort((a, b) => {
            return pageOrder.indexOf(a.id) - pageOrder.indexOf(b.id)
          })
        }
        if (pages && pages.length > this.state.pageIndex) {
          this.setState({ portfolioPages: pages })
        } else {
          window.location.href = '/publicfailed'
        }
      })
    } else {
      window.location.href = '/publicfailed'
    }
  }

  render() {
    // If the portfolioDetails does not equal null then we have found one
    if (this.state.portfolioPages) {
      // Array for storing JSX of sections to be displayed
      let sectionsJSX = null
      // If the sections array is present in the pages data then create the section JSX
      if (this.state.portfolioPages[this.state.pageIndex].content.sections) {
        sectionsJSX = (
          <SectionsList
            sections={this.state.portfolioPages[this.state.pageIndex].content.sections}
            editing={false}
          />
          
        )
      }
      // Check to see if the page has sections or is the old formatting
      const pageContent = this.state.portfolioPages[this.state.pageIndex].content.sections ? (
        sectionsJSX
      ) : (
        <p>Nothing here sorry</p>
      )

      return (
        // Display sidebar with pages data and section content
        <PublicSidebar
          pages={this.state.portfolioPages}
          content={pageContent}
          parentPortfolio={this}
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
