import React, { useEffect, useState } from 'react'

import { Grid } from '@material-ui/core'
import Sidebar from '../Sidebar'
import EditPortfolioDropdown from './EditPortfolioDropdown'
import EditPortfolioContent from './EditPortfolioContent'
import EditPortfolioStyle from './EditPortfolioStyle'
import { getPortfolio, getPortfolioPages } from '../../../Backend/Fetch'

export default function EditPortfolioPage() {
  /* -------------------------------------------------------------------------- */
  /*                          States and their Setters                          */
  /* -------------------------------------------------------------------------- */

  const [portfolio, setPortfolio] = useState({})
  const [pages, setPages] = useState([])
  const [editMode, setEditMode] = useState('content')

  /* -------------------------------------------------------------------------- */
  /*                         Fetching Current Portfolio                         */
  /* -------------------------------------------------------------------------- */

  const portfolioId = window.sessionStorage.getItem('portfolioId')

  // Runs when the component is mounted for the first time, fetches the
  // portfolio using the portfolioId item set in the sessionStorage.
  // The portfolioId is set in the sessionStorage when:
  // - A user clicks on the Add Portfolio button in AddPortfolioPage
  // - A user clicks on the Edit button in PortfolioCard
  useEffect(() => {
    getPortfolio(portfolioId).then((portfolio) => {
      setPortfolio({ ...portfolio })
      getPortfolioPages(portfolioId).then((pages) => {
        setPages(pages)
      })
    })
  }, [portfolioId])

  /* -------------------------------------------------------------------------- */
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Edit Style ------------------------------- */

  const editStylePage = <EditPortfolioStyle portfolio={portfolio} setPortfolio={setPortfolio} />

  /* ------------------------------ Edit Content ------------------------------ */

  const editContentPage = (
    <EditPortfolioContent
      portfolio={portfolio}
      setPortfolio={setPortfolio}
      pages={pages}
      setPages={setPages}
    />
  )

  /* ------------------------------ Rendered Page ----------------------------- */

  const pageContent = (
    <Grid container direction='column' spacing={0}>
      <EditPortfolioDropdown setEditMode={setEditMode} />
      {editMode === 'content' ? editContentPage : editStylePage}
    </Grid>
  )
  return <Sidebar content={pageContent} />
}
