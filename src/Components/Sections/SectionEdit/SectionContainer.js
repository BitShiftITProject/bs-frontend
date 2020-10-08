import React, { useContext, useState } from 'react'

import { Grid, makeStyles, Fab, Tooltip, InputLabel } from '@material-ui/core'
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone'
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone'
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone'
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone'
import DoneTwoToneIcon from '@material-ui/icons/DoneTwoTone'

import { useIntl } from 'react-intl'

import { PortfolioContext } from '../../Contexts/PortfolioContext'

/* -------------------------------------------------------------------------- */
/*                                   Styling                                  */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: 15,
    backgroundColor: theme.palette.background.paperLight,
    '&:hover': {
      backgroundColor: theme.palette.background.paperHover
    },
    '&:focus': {
      backgroundColor: theme.palette.background.paperHover
    }
  },
  inputLabel: {
    paddingBottom: theme.spacing(1)
  },
  sectionIcons: {
    margin: 0,
    [theme.breakpoints.only('md')]: {
      marginLeft: -theme.spacing(2)
    },
    '& .MuiFab-root': {
      transform: 'scale(0.7)'
    }
  },
  tooltip: {
    marginLeft: -theme.spacing(0.75),
    '& .MuiTooltip-tooltipPlacementRight': {
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
  }
}))

export default function SectionContainer({ children, sectionId, index, handleSectionDelete }) {
  const classes = useStyles()

  /* -------------------------------------------------------------------------- */
  /*                                   Locale                                   */
  /* -------------------------------------------------------------------------- */

  const intl = useIntl()

  /* -------------------------------------------------------------------------- */
  /*                                   Section                                  */
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ Section Label ----------------------------- */

  const titleCase = sectionId.replace(/([A-Z])/g, ' $1')
  const inputLabel = titleCase.charAt(0).toUpperCase() + titleCase.slice(1)

  /* -------------------------- Edit and Delete Modes ------------------------- */

  const [isEditMode, setEditMode] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const { startSectionEdit, finishSectionEdit } = useContext(PortfolioContext)

  // Make the current section editable
  function handleStartEdit() {
    setEditMode(true)
    startSectionEdit(index)
  }

  // Make the current section non-editable
  function handleFinishEdit() {
    setEditMode(false)
    finishSectionEdit(index)
  }

  // Actually delete the section
  function deleteSection() {
    setConfirmDelete(false)
    handleSectionDelete(index)
  }

  return (
    <Grid container direction='row' className={classes.container}>
      {/* -------------------------------------------------------------------------- */}

      {/* SECTION LABEL AND SECTION ELEMENTS */}

      <Grid
        item
        xs={10}
        lg={11}
        container
        direction='column'
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            handleFinishEdit()
          }
        }}
        onClick={handleStartEdit}
      >
        <Grid item container>
          <InputLabel className={classes.inputLabel}>{inputLabel}</InputLabel>
        </Grid>
        <Grid item container>
          {children}
        </Grid>
      </Grid>

      {/* -------------------------------------------------------------------------- */}

      {/* SECTION ACTION BUTTONS */}

      <Grid
        item
        xs={2}
        lg={1}
        container
        direction='column'
        justify='flex-start'
        alignItems='center'
        spacing={3}
        className={classes.sectionIcons}
      >
        {/* START EDITING & DONE EDITING BUTTONS */}
        {/* Can also start editing by clicking twice on the section,
         * and finish editing by clicking the Escape button */}
        {/* TODO: Find out why must click twice to edit section */}

        {!confirmDelete &&
          (isEditMode ? (
            <Tooltip
              PopperProps={{ className: classes.tooltip }}
              title={intl.formatMessage({ id: 'done' })}
              placement='right'
            >
              {/* DONE EDITING BUTTON */}
              <Fab
                size='small'
                color='primary'
                onClick={handleFinishEdit}
                className={classes.doneIcon}
              >
                <DoneTwoToneIcon />
              </Fab>
            </Tooltip>
          ) : (
            <Tooltip
              PopperProps={{ className: classes.tooltip }}
              title={intl.formatMessage({ id: 'edit' })}
              placement='right'
            >
              {/* START EDITING BUTTON */}
              <Fab
                size='small'
                color='primary'
                onClick={handleStartEdit}
                className={classes.editIcon}
              >
                <EditTwoToneIcon />
              </Fab>
            </Tooltip>
          ))}
        {/* DELETE BUTTON */}
        {!confirmDelete && (
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
        )}

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
