import React from 'react'
import { Grid, Fab, Typography, Divider } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import { useIntl } from 'react-intl'

import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import SectionsList from '../SectionsList'

const contentStyle = {
  borderRadius: 15,
  padding: 15,
  minWidth: 300,
  overflow: 'scroll',
  border: 'none',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  backdropFilter: 'blur(5px)'
}

export default function SectionsButton({ handleSectionClick }) {
  const intl = useIntl()

  /* -------------------------------------------------------------------------- */
  /*                        Section Templates Popup Menu                        */
  /* -------------------------------------------------------------------------- */

  // Clicking on the Add Section button toggles a menu, whereby the user can
  // choose to add a template by clicking on the SectionTemplate component within the
  // SectionsList component

  const popup = (
    <Popup
      trigger={
        <Fab variant='extended'>
          <AddIcon />
          {intl.formatMessage({ id: 'addSection' })}
        </Fab>
      }
      on={['click', 'focus']}
      position='top right'
      closeOnEscape
      contentStyle={contentStyle}
      offsetY={20}
      arrow={false}
    >
      {/* SECTIONS */}

      <div style={{ paddingTop: 8, paddingBottom: 8 }}>
        <Typography variant='h6' component='h4'>
          {intl.formatMessage({ id: 'chooseATemplate' })}
        </Typography>
      </div>

      <Divider />

      <SectionsList editing />
    </Popup>
  )
  return (
    <Grid>
      <div>{popup}</div>
    </Grid>
  )
}
