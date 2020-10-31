import React, { useEffect, useState } from 'react'

import { CssBaseline, Grid } from '@material-ui/core'
import Sidebar from '../Sidebar'
import EditPortfolioDropdown from './EditPortfolioDropdown'
import EditPortfolioContent from './EditPortfolioContentFiles/EditPortfolioContent'
import EditPortfolioStyle from './EditPortfolioStyle'
import PublicThemesProvider from '../../Contexts/PublicThemesContext'
import ThemesProvider from '../../Contexts/ThemesContext'
import { useStore } from '../../../Hooks/Store'

const setPortfolioIdSelector = (state) => state.setPortfolioId

export default function EditPortfolioPage() {
  /* -------------------------------------------------------------------------- */
  /*                          States and their Setters                          */
  /* -------------------------------------------------------------------------- */

  const [editMode, setEditMode] = useState('content')
  const setPortfolioId = useStore(setPortfolioIdSelector)

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
