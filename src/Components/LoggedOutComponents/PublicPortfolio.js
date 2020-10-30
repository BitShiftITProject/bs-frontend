import React, { useEffect } from 'react'
import Loading from '../CommonComponents/Loading'
import PublicSidebar from './PublicSidebar'
import { useParams } from 'react-router-dom'
import usePortfolio from '../../Hooks/usePortfolio'
import usePages from '../../Hooks/usePages'
import useEditPortfolio from '../../Hooks/useEditPortfolio'
import { useStore } from '../../Hooks/Store'

const setPageIdSelector = (state) => state.setPageId

function PublicPortfolio() {
  // Store the details of a portfolio so that we can use it later

  const { portfolio: portfolioId, page: pageIndex } = useParams()
  const { data: portfolio, status: portfolioStatus } = usePortfolio(portfolioId)
  const { data: pages } = usePages(portfolioId)
  const [editPortfolio] = useEditPortfolio()
  const setPageId = useStore(setPageIdSelector)

  useEffect(() => {
    if (portfolioStatus === 'success' && !portfolio) {
      window.location.href = '/publicfailed'
    }
  }, [portfolioStatus, portfolio])

  useEffect(() => {
    if (portfolioId && portfolio && pages) {
      const pageOrder = portfolio.pageOrder

      if (!pageOrder) {
        const patchDetails = { pageOrder: pages.map((p) => p.id) }
        editPortfolio({ portfolioId, patchDetails })
      } else {
        pages.sort((a, b) => {
          return pageOrder.indexOf(a.id) - pageOrder.indexOf(b.id)
        })
      }

      if (pages && pages.length > pageIndex) {
        setPageId(pages[pageIndex].id)
      } else {
        window.location.href = '/publicfailed'
      }
    }
  }, [editPortfolio, setPageId, pageIndex, pages, portfolio, portfolioId])

  return (
    <div>
      {portfolio && pages ? (
        <PublicSidebar pages={pages} />
      ) : (
        <div style={{ height: '100vh' }}>
          <Loading vertical />
        </div>
      )}
    </div>
  )
  // ;<>
  //   {portfolio && pages ? (
  //     <PublicSidebar />
  //   ) : (
  //     <div style={{ height: '100vh' }}>
  //       <Loading vertical />
  //     </div>
  //   )}
  // </div>
  // // If the portfolioDetails does not equal null then we have found one
  // if (state.portfolioPages) {
  //   // Array for storing JSX of sections to be displayed
  //   let sectionsJSX = null
  //   // If the sections array is present in the pages data then create the section JSX
  //   if (state.portfolioPages[state.pageIndex].content.sections) {
  //     sectionsJSX = (
  //       <SectionsList
  //         sections={state.portfolioPages[state.pageIndex].content.sections}
  //         editing={false}
  //       />
  //     )
  //   }
  //   // Check to see if the page has sections or is the old formatting
  //   const pageContent = state.portfolioPages[state.pageIndex].content.sections ? (
  //     sectionsJSX
  //   ) : (
  //     <p>Loading...</p>
  //   )

  //   return (
  //     // Display sidebar with pages data and section content
  //     <PublicSidebar
  //       pages={state.portfolioPages}
  //       content={pageContent}
  //       handlePageChange={handlePageChange}
  //     />
  //   )
  // }
  // // If portfolioDetails is null we are still fetching the portfolio
  // // We don't have to be worried about getting stuck since if getPortfolio() returns null
  // // Then it automatically redirects to /publicfailed
  // else {
  //   return (
  // <div style={{ height: '100vh' }}>
  //   <Loading vertical />
  // </div>
  //   )
  // }
}

export default PublicPortfolio
