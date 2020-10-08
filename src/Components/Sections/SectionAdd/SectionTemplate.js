import React from 'react'
import { makeStyles, Grid, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { GetNewSectionObject } from '../SectionsMap'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.1)',
      '& #addIconGrid span .MuiButtonBase-root': {
        backgroundColor: theme.palette.info.main,
        color: theme.palette.info.contrastText,
        transition: 'background-color 0.2s ease-in-out'
      }
    },

    '&:active': {
      backgroundColor: 'rgba(0,0,0,0.15)',
      '& #addIconGrid span .MuiButtonBase-root': {
        opacity: 0.8,
        backgroundColor: theme.palette.info.main,
        color: theme.palette.info.contrastText,
        transition: 'background-color 0.2s ease-in-out'
      }
    }
  },
  addIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',

    '& span': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& .MuiButtonBase-root': {
        background: 'none',
        color: theme.palette.text.primary,
        transform: 'scale(0.7)',
        transition: 'background-color 0.2s ease-in-out'
      }
    }
  }
}))

export default function SectionTemplate({ children, sectionId, handleSectionAdd }) {
  const classes = useStyles()
  const titleCase = sectionId.replace(/([A-Z])/g, ' $1')
  const sectionName = titleCase.charAt(0).toUpperCase() + titleCase.slice(1)

  function addSection() {
    const newSection = GetNewSectionObject(sectionId)
    handleSectionAdd(newSection, sectionName)
  }

  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      className={classes.container}
      onClick={addSection}
    >
      <Grid item xs={10}>
        {children}
      </Grid>

      <Grid item xs={2} container className={classes.addIcon} id='addIconGrid'>
        <span>
          <Fab size='small'>
            <AddIcon />
          </Fab>
        </span>
      </Grid>
    </Grid>
  )
}
