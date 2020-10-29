import React, { useState } from 'react'

import { Grid, makeStyles, Fab, Tooltip } from '@material-ui/core'
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone'
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone'
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone'
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone'

import { useIntl } from 'react-intl'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import usePages from '../../../Hooks/usePages'
import { useQueryCache } from 'react-query'
import { useStore } from '../../../Hooks/Store'
import useEditPage from '../../../Hooks/useEditPage'
import { useSnackbar } from 'notistack'
/* -------------------------------------------------------------------------- */
/*                                   Styling                                  */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    // marginBottom: theme.spacing(2),
    borderRadius: 15,
    // backgroundColor: theme.palette.background.paperLight,
    '&:hover': {
      // backgroundColor: theme.palette.background.paperHover
    },
    '&:focus': {
      // backgroundColor: theme.palette.background.paperHover
    }
  },

  sectionName: {
    paddingBottom: theme.spacing(1)
  },
  sectionIcons: {
    margin: 0,
    marginRight: -theme.spacing(0.7),
    // [theme.breakpoints.only('md')]: {
    //   marginLeft: -theme.spacing(2)
    // },
    '& .MuiFab-root': {
      transform: 'scale(0.7)'
    }
  },
  tooltip: {
    // marginLeft: -theme.spacing(0.75),
    '& .MuiTooltip-tooltip': {
      [theme.breakpoints.between('xs', 'sm')]: {
        display: 'none'
      },
      backgroundColor: theme.palette.iconButton.hover,
      color: theme.palette.iconButton.contrastText
    }
  },

  editIcon: {
    '&:hover': {
      backgroundColor: theme.palette.info.main,
      color: theme.palette.info.contrastText
    }
  },
  doneIcon: {
    '&:hover': {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.success.contrastText
    }
  },

  deleteIcon: {
    '&:hover': {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText
    }
  },

  confirmDeleteIcon: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.error.dark
    }
  },
  middle: {
    display: 'flex',
    alignItems: 'center',

    justifyContent: 'center'
  }
}))

const pageIdSelector = (state) => state.pageId
const startEditingElementSelector = (state) => state.startEditingElement

export default function SectionContainer({ children, sectionIndex }) {
  const classes = useStyles()
  // Locale
  const intl = useIntl()

  /* -------------------------------------------------------------------------- */
  /*                                   Section                                  */
  /* -------------------------------------------------------------------------- */

  /* -------------------------- Edit and Delete Modes ------------------------- */

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [confirmDelete, setConfirmDelete] = useState(false)

  const pageId = useStore(pageIdSelector)
  const startEditingElement = useStore(startEditingElementSelector)
  const currentPage = useQueryCache().getQueryData(['pages', pageId])
  const [editPage] = useEditPage()

  function startEditingSection(sectionIndex) {
    const elementIndex = 0
    const element = currentPage.content.sections[sectionIndex][elementIndex]
    startEditingElement(sectionIndex, elementIndex, element)
  }

  // Actually delete the section
  function deleteSection() {
    if (currentPage.content.sections.length >= sectionIndex + 1) {
      // Remove the section at the given index
      const newSections = currentPage.content.sections
      newSections.splice(sectionIndex, 1)

      const patchDetails = { content: { sections: newSections } }
      editPage({ pageId, patchDetails })

      // Show a notification that the section has been deleted from the page
      const key = enqueueSnackbar(
        intl.formatMessage({ id: 'deletedSectionFromPage' }, { pageTitle: currentPage.title }),
        {
          variant: 'error',
          persist: true
        }
      )

      setTimeout(() => {
        closeSnackbar(key)
      }, 2500)
    }

    setConfirmDelete(false)
  }

  return (
    <Grid container direction='row' justify='space-between' className={classes.container}>
      {/* -------------------------------------------------------------------------- */}
      <Grid item xs={1} className={classes.middle}>
        <DragHandleIcon
        // style={{'&:hover': {cursor: 'drag'}, '&:active': {cursor: 'dragging'}}}
        />
      </Grid>
      {/* SECTION LABEL AND SECTION ELEMENTS */}

      <Grid item xs={9} md={10} container direction='column'>
        {children}
      </Grid>

      {/* -------------------------------------------------------------------------- */}

      {/* SECTION ACTION BUTTONS */}

      <Grid
        item
        xs={2}
        md={1}
        container
        direction='column'
        justify='flex-start'
        alignItems='flex-end'
        spacing={3}
        className={classes.sectionIcons}
      >
        {/* -------------------------------------------------------------------------- */}
        {/* EDIT AND DELETE BUTTON */}
        {!confirmDelete && (
          <>
            <Tooltip
              PopperProps={{ className: classes.tooltip }}
              title={intl.formatMessage({ id: 'edit' })}
              placement='right'
            >
              <Fab
                size='small'
                color='primary'
                onClick={() => startEditingSection(sectionIndex)}
                className={classes.editIcon}
              >
                <CreateTwoToneIcon />
              </Fab>
            </Tooltip>
            <Tooltip
              PopperProps={{ className: classes.tooltip }}
              title={intl.formatMessage({ id: 'delete' })}
              placement='right'
            >
              <Fab
                size='small'
                color='primary'
                onClick={() => setConfirmDelete(true)}
                className={classes.deleteIcon}
              >
                <DeleteTwoToneIcon />
              </Fab>
            </Tooltip>
          </>
        )}

        {/* -------------------------------------------------------------------------- */}
        {/* CONFIRM DELETE AND CANCEL BUTTONS */}
        {/* After clicking the delete button once, we can confirm delete or opt to
         * cancel the delete action to the section. */}

        {confirmDelete && (
          <>
            <Tooltip
              PopperProps={{ className: classes.tooltip }}
              title={intl.formatMessage({ id: 'cancel' })}
              placement='right'
            >
              {/* CANCEL DELETE BUTTON */}
              <Fab size='small' onClick={() => setConfirmDelete(false)}>
                <CloseTwoToneIcon />
              </Fab>
            </Tooltip>
            <Tooltip
              PopperProps={{ className: classes.tooltip }}
              title={intl.formatMessage({ id: 'confirmDelete' })}
              placement='right'
            >
              {/* CONFIRM DELETE BUTTON */}
              <Fab size='small' onClick={deleteSection} className={classes.confirmDeleteIcon}>
                <DeleteForeverTwoToneIcon />
              </Fab>
            </Tooltip>
          </>
        )}
      </Grid>
    </Grid>
  )
}
