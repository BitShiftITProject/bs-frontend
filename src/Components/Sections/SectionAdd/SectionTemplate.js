import React from 'react'
import { makeStyles, Icon, Grid } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.1)',
      '& #addIconGrid .MuiIcon-root': {
        backgroundColor: theme.palette.info.main,
        color: theme.palette.info.contrastText,
        transition: 'background-color 0.2s ease-in-out'
      }
    },

    '&:active': {
      backgroundColor: 'rgba(255,255,255,0.1)',
      '& #addIconGrid .MuiIcon-root': {
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
      height: theme.spacing(4),
      width: theme.spacing(4),
      borderRadius: '50%',
      transition: 'background-color 0.2s ease-in-out'
    }
  }
}))

export default function SectionTemplate({ sectionId, children }) {
  const classes = useStyles()
  return (
    <Grid container justify='center' alignItems='center' className={classes.container}>
      <Grid item xs={10}>
        {children}
      </Grid>

      <Grid item xs={2} container className={classes.addIcon} id='addIconGrid'>
        <span>
          <Icon>
            <AddIcon />
          </Icon>
        </span>
      </Grid>
    </Grid>
  )
}
