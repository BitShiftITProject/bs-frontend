import React, { useCallback } from 'react'
import { Drawer, List, ListItem, ListItemText, makeStyles } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'
import { useStore } from '../../Hooks/Store'
import shallow from 'zustand/shallow'
import SectionsList from '../Sections/SectionsList'
import Loading from '../CommonComponents/Loading'
import usePages from '../../Hooks/usePages'

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

const pageSelector = ({ pageId, setPageId }) => [pageId, setPageId]

function PublicSidebar() {
  const classes = useStyles()

  /* -------------------------------------------------------------------------- */
  /*                                   History                                  */
  /* -------------------------------------------------------------------------- */

  const history = useHistory()

  /* -------------------------------------------------------------------------- */
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */

  const { portfolio: portfolioId } = useParams()
  const { data: pages } = usePages(portfolioId)

  const [pageId, setPageId] = useStore(useCallback(pageSelector, []), shallow)

  const pageTitles = pages.map((page) => page.title)

  const handleClick = useCallback(
    (index) => {
      setPageId(pages[index].id)
      history.replace(history.location.pathname.split('/').slice(0, -1).join('/') + '/' + index)
    },
    [setPageId, history, pages]
  )

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
            <ListItem button key={text} onClick={() => handleClick(index)}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.content}>
        <div>
          {pages && pageId ? (
            <SectionsList
              sections={pages.find((p) => p.id === pageId).content.sections}
              editing={false}
            />
          ) : (
            <div style={{ height: '100vh' }}>
              <Loading vertical />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default React.memo(PublicSidebar)
