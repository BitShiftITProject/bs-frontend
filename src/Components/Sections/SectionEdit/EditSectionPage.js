import React, { useCallback, useEffect } from 'react'
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
function EditSectionPage({ handleEditAnotherElement, autosaveElement }) {
  const editing = true

  const [pageId, sectionIndex, elementIndex] = useStore(
    useCallback(currentSectionDetails, []),
    shallow
  )

  const { data: currentPage } = usePage(pageId)
  // console.log('Current page in edit section page:', currentPage)

  function handleClick(sectionIndex, elementIndex) {
    handleEditAnotherElement(sectionIndex, elementIndex)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log('Autosaved!')
      autosaveElement()
    }, 60 * 1000)
    return () => {
      clearInterval(interval)
    }
  }, [autosaveElement])

  return sectionIndex !== null ? (
    <Grid container direction='column' style={{ width: '600px' }}>
      <DialogTitle>Edit Section</DialogTitle>
      <Grid item container direction='column'>
        <div style={{ flexGrow: 1, width: '100%' }}>
          <AppBar position='static' color='default'>
            <Tabs
              value={elementIndex}
              variant='scrollable'
              scrollButtons='on'
              indicatorColor='secondary'
              aria-label='scrollable force tabs example'
            >
              {currentPage.content.sections[sectionIndex].map((element, idx) => (
                <Tab
                  key={idx}
                  icon={sectionElements[element.id][2]}
                  label={sectionElements[element.id][0]}
                  onClick={() => handleClick(sectionIndex, idx)}
                />
              ))}
            </Tabs>
          </AppBar>
          {currentPage.content.sections[sectionIndex].map((element, idx) => (
            <TabPanel key={idx} value={elementIndex} index={idx} style={{ margin: 32 }}>
              {GetElementJSX(element, editing)}
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
