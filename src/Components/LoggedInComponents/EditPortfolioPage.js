import React from 'react'
import clsx from 'clsx'

import { loggedInStyles } from '../loggedInStyles'

import {
  Grid,
  Typography,
  Paper,
  Fab,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import CloseIcon from '@material-ui/icons/Close'
import Sidebar from './Sidebar'

export default function EditPortfolioPage() {
  const classes = loggedInStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  const leftPanel = clsx(fixedHeightPaper, classes.changeHeightAtSmall)

  const listItems = ['About Me', 'Education', 'Contact']

  const content = (
    <Grid container direction='row' spacing={0}>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={leftPanel}>
          <Grid style={{ width: '100%', height: '100%' }}>
            <Grid
              container
              direction='row'
              justify='space-between'
              alignItems='center'
              className={classes.padded}
            >
              <Typography variant='button'>Title</Typography>
              <Fab size='small'>
                <CreateIcon />
              </Fab>
            </Grid>
            <Divider orientation='horizontal' />
            <Grid container direction='column' justify='space-evenly' className={classes.padded}>
              <Typography variant='overline'>Pages</Typography>
              <List>
                {listItems.map((item, idx) => (
                  <ListItem key={idx} button className={classes.hiddenButtonItem}>
                    <ListItemText
                      onClick={() => {
                        alert(item)
                      }}
                    >
                      {item}
                    </ListItemText>
                    <Fab
                      size='small'
                      className={classes.hiddenButton}
                      onClick={() => {
                        alert(`Editing ${item}`)
                      }}
                    >
                      <CreateIcon />
                    </Fab>
                    <Fab
                      size='small'
                      className={classes.hiddenButton}
                      onClick={() => {
                        alert(`Deleting ${item}`)
                      }}
                    >
                      <CloseIcon />
                    </Fab>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          <Grid item xs={12} container direction='column' style={{ height: '100%' }}>
            <Grid item>
              <form>
                <Grid container justify='space-around' direction='column'>
                  <TextField variant='outlined' label='Title' fullWidth multiline></TextField>
                  <TextField variant='outlined' label='Paragraph' fullWidth multiline></TextField>
                </Grid>
              </form>
            </Grid>
            <Grid item>
              <Fab>
                <CreateIcon />
              </Fab>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
  return <Sidebar content={content} />
}
