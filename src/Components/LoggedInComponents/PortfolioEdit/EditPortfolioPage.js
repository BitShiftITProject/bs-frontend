import React, { useCallback, useEffect, useState } from 'react'

import { CssBaseline, Grid } from '@material-ui/core'
import Sidebar from '../Sidebar'
import EditPortfolioDropdown from './EditPortfolioDropdown'
import EditPortfolioContent from './EditPortfolioContentFiles/EditPortfolioContent'
import EditPortfolioStyle from './EditPortfolioStyle'
import PublicThemesProvider from '../../Contexts/PublicThemesContext'
import ThemesProvider from '../../Contexts/ThemesContext'
import { useStore } from '../../../Hooks/Store'
import shallow from 'zustand/shallow'
import usePortfolios from '../../../Hooks/usePortfolios'
import { useQueryCache } from 'react-query'

const portfolioIdSelector = ({ portfolioId, setPortfolioId }) => [portfolioId, setPortfolioId]

export default function EditPortfolioPage() {
  /* -------------------------------------------------------------------------- */
  /*                          States and their Setters                          */
  /* -------------------------------------------------------------------------- */

  const [editMode, setEditMode] = useState('content')
  const [portfolioId, setPortfolioId] = useStore(useCallback(portfolioIdSelector, []), shallow)
  const user = useQueryCache().getQueryData('user')
  const { data: portfolio } = usePortfolios(user)

  useEffect(() => {
    if (!portfolioId || !portfolio) {
      window.location.href = '/portfolios'
    }
  }, [portfolioId, portfolio])

  useEffect(() => {
    return () => setPortfolioId(null)
  }, [setPortfolioId])

  /* -------------------------------------------------------------------------- */
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- Edit Style ------------------------------- */

  const editStylePage = (
    <PublicThemesProvider>
      <ThemesProvider>
        <CssBaseline>
          <EditPortfolioStyle />
        </CssBaseline>
      </ThemesProvider>
    </PublicThemesProvider>
  )

  /* ------------------------------ Edit Content ------------------------------ */

  const editContentPage = <EditPortfolioContent />

  /* ------------------------------ Rendered Page ----------------------------- */

  const pageContent = (
    <Grid container direction='column' spacing={0}>
      <EditPortfolioDropdown setEditMode={setEditMode} />
      {editMode === 'content' ? editContentPage : editStylePage}
    </Grid>
  )
  return <Sidebar content={pageContent} />
}
