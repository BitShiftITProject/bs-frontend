import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Grid, DialogTitle, DialogContent, AppBar, Tabs, Tab, Dialog } from '@material-ui/core'
import { GetElementJSX } from '../SectionsMap'
import { useStore } from '../../../Hooks/Store'
import useEditPage from '../../../Hooks/useEditPage'

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

const elementEditFunctions = ({
  startEditingElement,
  editCurrentElement,
  finishEditingElement
}) => [startEditingElement, editCurrentElement, finishEditingElement]

const pageIdSelector = (state) => state.pageId
const currentElementSelector = (state) => state.currentElement

export default function SectionEditDialog() {
  const currentElement = useStore(currentElementSelector)
  const [startEditingElement, editCurrentElement, finishEditingElement] = useStore(
    useCallback(elementEditFunctions, [])
  )

  const [editPage] = useEditPage()

  return sectionIndex !== null ? (
    <Dialog open={editMode} onClose={finishSectionEdit} fullWidth maxWidth='sm'>
      <DialogTitle>Edit Section</DialogTitle>
      <DialogContent>
        <Grid container direction='column'>
          <Grid item container>
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
                  {sections[pageId][sectionIndex].map((element, idx) => (
                    <Tab key={idx} label={element.id} />
                  ))}
                </Tabs>
              </AppBar>
              {sections[pageId][sectionIndex].map((element, idx) => (
                <TabPanel key={idx} value={elementIndex} index={idx}>
                  {GetElementJSX(element, true, sectionIndex, idx)}
                </TabPanel>
              ))}
            </div>
          </Grid>
        </Grid>
        <Grid item container></Grid>
      </DialogContent>
    </Dialog>
  ) : (
    <div></div>
  )
}
