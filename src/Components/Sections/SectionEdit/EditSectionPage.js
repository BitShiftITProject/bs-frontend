import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Grid, AppBar, Tabs, Tab, DialogTitle } from '@material-ui/core'
import { GetElementJSX, sectionElements } from '../SectionsMap'
import { useStore } from '../../../Hooks/Store'
import shallow from 'zustand/shallow'
import usePage from '../../../Hooks/usePage'
import Loading from '../../CommonComponents/Loading'

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

const currentSectionDetails = ({ pageId, sectionIndex, elementIndex }) => [
  pageId,
  sectionIndex,
  elementIndex
]

// If currently editing an element, then we are currently editing a section.
// Therefore we need to show the edit panel for the current section's elements.
function EditSectionPage({ handleFinishEditingElement }) {
  const editing = true

  const [pageId, sectionIndex, elementIndex] = useStore(
    useCallback(currentSectionDetails, []),
    shallow
  )

  const { data: currentPage } = usePage(pageId)
  // console.log('Current page in edit section page:', currentPage)

  function handleChange() {
    handleFinishEditingElement()
  }

  return sectionIndex !== null ? (
    <Grid container direction='column'>
      <DialogTitle>Edit Section</DialogTitle>
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
              {currentPage.content.sections[sectionIndex].map((element, idx) => (
                <Tab key={idx} label={sectionElements[element.id][0]} />
              ))}
            </Tabs>
          </AppBar>
          {currentPage.content.sections[sectionIndex].map((element, idx) => (
            <TabPanel key={idx} value={elementIndex} index={idx} style={{ margin: 32 }}>
              {GetElementJSX(element, editing, sectionIndex, idx)}
              {/* <div>{JSON.stringify(element)}</div> */}
            </TabPanel>
          ))}
        </div>
      </Grid>
      <Grid item container></Grid>
    </Grid>
  ) : (
    <div>
      <Loading vertical />
    </div>
  )
}

export default React.memo(EditSectionPage)
