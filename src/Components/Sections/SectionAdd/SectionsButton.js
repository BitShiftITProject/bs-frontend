import React, { useCallback, useState } from 'react'
import {
  Grid,
  Fab,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  ButtonBase,
  Link
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

import { useIntl } from 'react-intl'

import CustomDialog from '../../CommonComponents/CustomDialog'
import { GetElementJSX, sectionElements, ConvertToSection } from '../SectionsMap'
import { useStore } from '../../../Hooks/Store'
import useEditPage from '../../../Hooks/useEditPage'
import usePage from '../../../Hooks/usePage'
import { useSnackbar } from 'notistack'

const pageIdSelector = (state) => state.pageId

function SectionsButton() {
  const intl = useIntl()

  const editing = true

  const [open, setOpen] = useState(false)
  const [elements, setElements] = useState([])
  const pageId = useStore(useCallback(pageIdSelector, []))
  const { data: currentPage } = usePage(pageId)
  // console.log('Current page in sections button:', currentPage)

  const [editPage] = useEditPage()

  const { enqueueSnackbar } = useSnackbar()

  function addSectionElement(elementName) {
    setElements((elements) => [...elements, { id: elementName, data: null }])
  }

  function removeSectionElement(index) {
    const newElements = elements
    newElements.splice(index, 1)
    setElements([...newElements])
  }

  function handleClick() {
    const newSection = ConvertToSection(elements)
    const pageTitle = currentPage.title

    const patchDetails = {
      content: { sections: [...currentPage.content.sections, newSection] }
    }
    editPage({ pageId, patchDetails })
    // Shows a notification that the section has been added
    enqueueSnackbar(intl.formatMessage({ id: 'addedSectionToPage' }, { pageTitle }), {
      variant: 'info'
    })
    setOpen(false)
  }

  function handleOpen() {
    setElements([])
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  /* -------------------------------------------------------------------------- */
  /*                        Section Templates Popup Menu                        */
  /* -------------------------------------------------------------------------- */

  const dialogContent = (
    <div>
      <DialogTitle>{intl.formatMessage({ id: 'addSection' })}</DialogTitle>
      <DialogContent>
        <Grid container direction='column' spacing={4}>
          <Grid item container>
            <Typography variant='button'>Preview</Typography>
            <Grid
              style={{
                height: 200,
                padding: 24,
                marginTop: 16,
                backgroundColor: 'rgba(0,0,0,0.1)'
              }}
              container
              direction='row'
              spacing={2}
            >
              {elements.map((section, idx) => (
                <Grid
                  key={idx}
                  container
                  item
                  xs={12 / elements.length}
                  style={{ height: '100%', position: 'relative' }}
                >
                  {GetElementJSX(section, editing)}
                  <Fab
                    size='small'
                    style={{ transform: 'scale(0.9)', position: 'absolute', top: -10, right: -5 }}
                    onClick={() => removeSectionElement(idx)}
                  >
                    <CloseIcon />
                  </Fab>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item container direction='column' spacing={2}>
            <Grid item>
              <Typography variant='body1'>Choose elements to add to your new section:</Typography>
            </Grid>
            <Grid item container direction='row' spacing={2}>
              {Object.keys(sectionElements).map((elementName, idx) => (
                <Grid key={idx} item>
                  <ButtonBase
                    disabled={elements.length === 4}
                    onClick={(e) => addSectionElement(elementName)}
                  >
                    <Link color='textPrimary' style={{ textTransform: 'capitalize' }}>
                      {sectionElements[elementName][0]}
                    </Link>
                  </ButtonBase>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{intl.formatMessage({ id: 'cancel' })}</Button>
        <Button disabled={!elements.length} onClick={handleClick}>
          {intl.formatMessage({ id: 'addSection' })}
        </Button>
      </DialogActions>
    </div>
  )

  const dialog = <CustomDialog open={open} setOpen={setOpen} content={dialogContent} />

  return (
    <Grid>
      <div>
        <Fab
          style={!pageId ? { visibility: 'hidden' } : {}}
          variant='extended'
          onClick={handleOpen}
        >
          <AddIcon style={{ paddingRight: 5 }} />
          {intl.formatMessage({ id: 'addSection' })}
        </Fab>
        {dialog}
      </div>
    </Grid>
  )
}

export default SectionsButton
