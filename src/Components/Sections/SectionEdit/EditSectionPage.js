import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Grid, AppBar, Tabs, Tab, Typography } from '@material-ui/core'
import { GetElementJSX } from '../SectionsMap'
import { useStore } from '../../../Hooks/Store'
import useEditPage from '../../../Hooks/useEditPage'
import shallow from 'zustand/shallow'
import { useQueryCache } from 'react-query'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div
          style={{
            height: 300,
            marginBottom: 24,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

const currentSectionDetails = ({ pageId, sectionIndex, elementIndex, currentElement }) => [
  pageId,
  sectionIndex,
  elementIndex,
  currentElement
]

// If currently editing an element, then we are currently editing a section.
// Therefore we need to show the edit panel for the current section's elements.
export default function EditSectionPage({ handleFinishEditingElement }) {
  const [pageId, sectionIndex, elementIndex, currentElement] = useStore(
    useCallback(currentSectionDetails, []),
    shallow
  )

  const currentPage = useQueryCache().getQueryData(['pages', pageId])

  function handleChange() {
    handleFinishEditingElement()
  }

  return sectionIndex !== null ? (
    <Grid container direction='column'>
      <Grid item>
        <Typography>Edit Section</Typography>
      </Grid>
      <Grid item container direction='column'>
        <div style={{ flexGrow: 1, width: '100%' }}>
          <AppBar position='static' color='default'>
            <Tabs
              value={elementIndex}
              onChange={handleChange}
              variant='scrollable'
              scrollButtons='on'
              indicatorColor='secondary'
              textColor='secondary'
              aria-label='scrollable force tabs example'
            >
              {currentPage.content.sections.map((element, idx) => (
                <Tab key={idx} label={element.id} />
              ))}
            </Tabs>
          </AppBar>
          {currentPage.content.sections.map((element, idx) => (
            <TabPanel key={idx} value={elementIndex} index={idx}>
              {GetElementJSX(element, true, sectionIndex, idx)}
            </TabPanel>
          ))}
        </div>
      </Grid>
      <Grid item container></Grid>
    </Grid>
  ) : (
    <div></div>
  )
}
