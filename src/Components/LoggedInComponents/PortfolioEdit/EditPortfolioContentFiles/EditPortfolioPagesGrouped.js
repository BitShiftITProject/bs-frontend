import React from 'react'
import { useIntl } from 'react-intl'

import { Grid, Paper, Fab, Divider, List, ListItem, ListItemText } from '@material-ui/core'

import VisibilityIcon from '@material-ui/icons/Visibility'
import CreateIcon from '@material-ui/icons/Create'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

import { loggedInStyles, CursorTypography } from '../../../../Styles/loggedInStyles'

/* Pages and adding/removing pages part of the editing portfolio*/
export default function EditPortfolioPagesGrouped({
  handlePortfolioEvent,
  handlePageSelect,
  portfolio,
  pages,
  pageId,
  handlePageEvent
}) {
  const classes = loggedInStyles()
  const leftPanel = classes.leftPanel

  // Locale
  const intl = useIntl()

  const portfolioLink = `/public/${portfolio.id}/0`

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
          style={{ height: '100%', margin: 0, padding: 0 }}
        >
          <Grid style={{ width: '100%' }}>
            {/*
             * PORTFOLIO TITLE
             */}
            <Grid
              container
              direction='row'
              justify='space-between'
              alignItems='center'
              className={classes.padded}
            >
              <Grid item xs={6}>
                <CursorTypography variant='button'>{portfolio.title}</CursorTypography>
              </Grid>

              {/* PORTFOLIO BUTTONS */}

              <Grid
                item
                xs={5}
                container
                direction='row'
                justify='space-evenly'
                alignItems='center'
              >
                {/* VIEW PORTFOLIO BUTTON */}
                <Fab
                  color='secondary'
                  size='small'
                  onClick={() => {
                    window.location.href = portfolioLink
                  }}
                  style={{
                    transform: 'scale(0.8)'
                  }}
                >
                  <VisibilityIcon />
                </Fab>

                {/* EDIT PORTFOLIO BUTTON */}
                <Fab
                  color='secondary'
                  size='small'
                  onClick={() => handlePortfolioEvent('editPortfolio', portfolio.title)}
                  style={{
                    transform: 'scale(0.8)'
                  }}
                >
                  <CreateIcon />
                </Fab>
              </Grid>
            </Grid>

            <Divider />

            {/* PORTFOLIO PAGES (List) */}

            <Grid
              style={{ width: '100%', paddingTop: 16 }}
              container
              direction='column'
              justify='flex-start'
            >
              <CursorTypography variant='overline'>
                {intl.formatMessage({ id: 'pages' })}
              </CursorTypography>

              {/* Each list item corresponds to a page. It shows the page's title, and when
               * hovered has an edit button (Pen icon) and a delete button (Trash icon). */}

              <List className={classes.pageList}>
                {pages &&
                  pages.map((page, idx) => (
                    <ListItem
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
                          lg={1}
                          container
                          direction='row'
                          justify='center'
                          alignItems='center'
                        >
                          <div className={classes.selectedIndicator}></div>
                        </Grid>

                        <Grid
                          item
                          xs={5}
                          md={7}
                          lg={6}
                          container
                          justify='flex-start'
                          alignItems='center'
                        >
                          <ListItemText>{page.title}</ListItemText>
                        </Grid>
                        <Grid
                          item
                          xs={5}
                          md={3}
                          lg={4}
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
                  ))}
              </List>
            </Grid>
          </Grid>

          {/* ADD PAGE BUTTON */}

          <Fab
            className={classes.floatingBottomContainer}
            color='primary'
            size='medium'
            variant='extended'
            onClick={() => handlePageEvent('addPage', '')}
            style={{ width: '100%', marginLeft: 5, marginRight: 5 }}
          >
            {intl.formatMessage({ id: 'addPage' })}
            <AddIcon style={{ paddingLeft: 5 }} />
          </Fab>
        </Grid>
      </Paper>
    </Grid>
  )
}
