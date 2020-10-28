import React, { useContext, useEffect } from 'react'
import { Drawer, List, ListItem, ListItemText, makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { PortfolioContext } from '../Contexts/PortfolioContext'

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

function PublicSidebar(props) {
  const classes = useStyles()

  /* -------------------------------------------------------------------------- */
  /*                                   History                                  */
  /* -------------------------------------------------------------------------- */

  const history = useHistory()
  const { setPageId } = useContext(PortfolioContext)

  /* -------------------------------------------------------------------------- */
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */

  const { pageIndex, content, pages, parentPortfolio } = props

  const pageTitles = pages.map((page) => page.title)

  useEffect(() => {
    // console.log(pages[pageIndex].id)
    setPageId(pages[pageIndex].id)
  }, [pages, setPageId, pageIndex])

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
                parentPortfolio.setState({ pageIndex: index })
                history.replace(
                  history.location.pathname.split('/').slice(0, -1).join('/') + '/' + index
                )
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

export default React.memo(PublicSidebar)
