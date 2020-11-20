import React from 'react'
import { useIntl } from 'react-intl'

import clsx from 'clsx'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import arrayMove from 'array-move'
import { Grid, Paper, Fab, Divider, List, ListItem, ListItemText } from '@material-ui/core'

import VisibilityIcon from '@material-ui/icons/Visibility'
import CreateIcon from '@material-ui/icons/Create'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

import { loggedInStyles, CursorTypography } from '../../../../Styles/loggedInStyles'

import useEditPortfolio from '../../../../Hooks/useEditPortfolio'
import { useStore } from '../../../../Hooks/Store'
import usePortfolio from '../../../../Hooks/usePortfolio'
import usePages from '../../../../Hooks/usePages'
import { useQueryCache } from 'react-query'

const portfolioIdSelector = (state) => state.portfolioId
const pageIdSelector = (state) => state.pageId

/* Pages and adding/removing pages part of the editing portfolio*/
export default function EditPortfolioPagesGrouped({
  handlePortfolioEvent,
  handlePageSelect,
  handlePageEvent
}) {
  const classes = loggedInStyles()
  const leftPanel = classes.leftPanel

  // Locale
  const intl = useIntl()

  const portfolioId = useStore(portfolioIdSelector)
  const pageId = useStore(pageIdSelector)
  const { data: portfolio } = usePortfolio(portfolioId)
  const { data: pages } = usePages(portfolioId)
  const [editPortfolio] = useEditPortfolio(portfolioId)
  const cache = useQueryCache()

  /* -------------------------------------------------------------------------- */
  /*                                Drag and Drop                               */
  /* -------------------------------------------------------------------------- */

  // Needed for react-beautiful-dnd to work, passed to the DragDropContext
  const onDragEnd = ({ source, destination }) => {
    if (pages.length > 1 && source && destination) {
      // Update the pages state with the new order
      const newPages = arrayMove(pages, source.index, destination.index)

      const patchDetails = { pageOrder: newPages.map((p) => p.id) }
      editPortfolio({ portfolioId: portfolio.id, patchDetails }).then(() => {
        cache.refetchQueries(['pages', { portfolioId: portfolio.id }])
      })
    }
  }

  const handlePortfolioView = () => {
    window.open(`/public/${portfolio.id}/0`)
  }

  return (
    <Grid item xs={12} md={4} lg={3}>
      <Paper className={leftPanel}>
        {/*
         * LIST MENU CONTENT
         */}
        <Grid
          container
          direction='column'
          justify='flex-start'
          alignItems='center'
          style={{ height: '100%', margin: 0, padding: 0, flexWrap: 'unset' }}
        >
          {/*
           * PORTFOLIO TITLE
           */}
          <Grid
            container
            direction='row'
            justify='space-between'
            alignItems='center'
            className={clsx(classes.leftPanelContainerItem, classes.padded)}
          >
            <Grid item xs={6}>
              <CursorTypography variant='button'>{portfolio.title}</CursorTypography>
            </Grid>

            {/* PORTFOLIO BUTTONS */}

            <Grid item xs={5} container direction='row' justify='space-evenly' alignItems='center'>
              {/* EDIT PORTFOLIO BUTTON */}
              <Fab
                color='secondary'
                size='small'
                onClick={() =>
                  handlePortfolioEvent('editPortfolio', {
                    title: portfolio.title,
                    description: portfolio.description
                  })
                }
                style={{
                  transform: 'scale(0.8)'
                }}
              >
                <CreateIcon />
              </Fab>
              {/* VIEW PORTFOLIO BUTTON */}
              <Fab
                disabled={!pages.length}
                color='secondary'
                size='small'
                onClick={handlePortfolioView}
                style={{
                  transform: 'scale(0.8)'
                }}
              >
                <VisibilityIcon />
              </Fab>
            </Grid>
          </Grid>

          <Divider style={{ width: '100%' }} />

          {/* PORTFOLIO PAGES (List) */}

          <Grid
            style={{ width: '100%', paddingTop: 16 }}
            container
            direction='column'
            justify='flex-start'
          >
            <CursorTypography variant='overline' className={classes.leftPanelContainerItem}>
              {intl.formatMessage({ id: 'pages' })}
            </CursorTypography>

            {/* Each list item corresponds to a page. It shows the page's title, and when
             * hovered has an edit button (Pen icon) and a delete button (Trash icon). */}

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId='pagesDroppable'>
                {(provided, snapshot) => (
                  <List
                    className={classes.pageList}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {pages &&
                      pages.map((page, idx) => (
                        <Draggable key={page.id} draggableId={page.id} index={idx}>
                          {(provided, snapshot) => (
                            <ListItem
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => handlePageSelect(page.id)}
                              key={page.id}
                              button
                              selected={page.id === pageId}
                              className={classes.hiddenButtonItem}
                            >
                              {/* PAGE TITLE */}

                              <Grid container justify='space-between'>
                                <Grid
                                  item
                                  xs={1}
                                  container
                                  justify='center'
                                  alignItems='center'
                                  className={classes.dragHandleIconContainer}
                                >
                                  <DragHandleIcon className={classes.dragHandleIcon} />
                                </Grid>
                                {/* <Grid item xs={1} container justify='center' alignItems='center'>
                              <div className={classes.selectedIndicator}></div>
                            </Grid> */}

                                <Grid
                                  item
                                  xs={5}
                                  md={6}
                                  container
                                  justify='flex-start'
                                  alignItems='center'
                                >
                                  <ListItemText>{page.title}</ListItemText>
                                </Grid>
                                <Grid
                                  item
                                  xs={5}
                                  md={4}
                                  container
                                  direction='row'
                                  justify='flex-end'
                                  alignItems='center'
                                  spacing={1}
                                >
                                  {/* EDIT PAGE BUTTON */}

                                  <Fab
                                    size='small'
                                    className={classes.hiddenButton}
                                    onClick={() => handlePageEvent('editPage', idx)}
                                  >
                                    <CreateIcon />
                                  </Fab>
                                  {/* DELETE PAGE BUTTON */}
                                  <Fab
                                    size='small'
                                    className={classes.hiddenButton}
                                    onClick={() => handlePageEvent('deletePage', idx)}
                                  >
                                    <CloseIcon />
                                  </Fab>
                                </Grid>
                              </Grid>
                            </ListItem>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </List>
                )}
              </Droppable>
            </DragDropContext>
          </Grid>

          {/* ADD PAGE BUTTON */}

          <Grid container>
            <Fab
              color='primary'
              size='medium'
              variant='extended'
              onClick={() => handlePageEvent('addPage', '')}
              style={{ margin: 24, width: '100%' }}
            >
              {intl.formatMessage({ id: 'addPage' })}
              <AddIcon style={{ paddingLeft: 5 }} />
            </Fab>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}
