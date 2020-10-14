import React from 'react'
import { Drawer, List, ListItem, ListItemText, makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

/* -------------------------------------------------------------------------- */
/*                                   Styling                                  */
/* -------------------------------------------------------------------------- */

const drawerWidth = 210

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    width: `100vw`
    // backgroundColor: theme.palette.background.default,
    // color: theme.palette.text.primary
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: theme.palette.titleBar.main,
    color: theme.palette.titleBar.contrastText
  },
  drawerPaper: {
    width: drawerWidth
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
    padding: theme.spacing(5)
  }
}))

export default function PublicSidebar(props) {
  const classes = useStyles()

  /* -------------------------------------------------------------------------- */
  /*                                   History                                  */
  /* -------------------------------------------------------------------------- */

  const history = useHistory()

  /* -------------------------------------------------------------------------- */
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */

  const { content, pages } = props

  const pageTitles = pages.map((page) => page.title)

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper
        }}
        anchor='left'
      >
        <div className={classes.toolbar} />
        <List>
          {pageTitles.map((text, index) => (
            <ListItem
              button
              key={text}
              onClick={() => {
                history.push(
                  history.location.pathname.split('/').slice(0, -1).join('/') + '/' + index
                )
                history.go()
              }}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.content}>{content}</div>
    </div>
  )
}
