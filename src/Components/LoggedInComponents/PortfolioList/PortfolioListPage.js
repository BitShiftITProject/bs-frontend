import React, { useEffect, useState } from 'react'

import {
  Paper,
  Fab,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  withStyles,
  makeStyles,
  TextField,
  IconButton,
  Tooltip
} from '@material-ui/core'
import FilterNoneOutlinedIcon from '@material-ui/icons/FilterNoneOutlined'
import AddIcon from '@material-ui/icons/Add'

import { useHistory } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useSnackbar } from 'notistack'

import transitions from '../../../Styles/transitions'
import PortfolioCard from './PortfolioCard'
import CustomDialog from '../../CommonComponents/CustomDialog'
import { logout } from '../../../Backend/Fetch'
import { useIntl } from 'react-intl'
import useUser from '../../../Hooks/useUser'
import usePortfolios from '../../../Hooks/usePortfolios'
import { loggedInStyles } from '../../../Styles/loggedInStyles'
import useDeletePortfolio from '../../../Hooks/useDeletePortfolio'
import { useStore } from '../../../Hooks/Store'

/* -------------------------------------------------------------------------- */
/*                                   Styling                                  */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles((theme) => ({
  addPortfolioFab: {
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  },
  addPortfolioIcon: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(0.5)
    }
  },
  portfolio: {
    margin: theme.spacing(3)
  }
}))

const setPortfolioIdSelector = (state) => state.setPortfolioId

function PortfolioListPage(props) {
  const classes = useStyles()
  const fixedHeightPaper = loggedInStyles().fixedHeightPaper
  const floatingTopContainer = loggedInStyles().floatingTopContainer

  // Breakpoint sizes for portfolio
  const { xs, md, lg } = props

  /* -------------------------------------------------------------------------- */
  /*                                   Locale                                   */
  /* -------------------------------------------------------------------------- */

  const intl = useIntl()

  /* -------------------------------------------------------------------------- */
  /*                                   History                                  */
  /* -------------------------------------------------------------------------- */

  const history = useHistory()

  /* -------------------------------------------------------------------------- */
  /*                                  Snackbars                                 */
  /* -------------------------------------------------------------------------- */

  const { enqueueSnackbar } = useSnackbar()

  /* -------------------------------------------------------------------------- */
  /*                     Fetching Initial List of Portfolios                    */
  /* -------------------------------------------------------------------------- */

  const { data: user, status: userStatus } = useUser()
  const { data: portfolios, status: portfoliosStatus } = usePortfolios(user)

  useEffect(() => {
    if (userStatus === ' error') logout()
  }, [userStatus])

  const [deletePortfolio] = useDeletePortfolio()
  const setPortfolioId = useStore(setPortfolioIdSelector)

  /* -------------------------------------------------------------------------- */
  /*                          Portfolio Event Handlers                          */
  /* -------------------------------------------------------------------------- */

  /* ------------------------------ Add Portfolio ----------------------------- */

  const handleAdd = (details) => {
    history.push('/portfolios/add')
  }

  /* ----------------------------- View Portfolio ----------------------------- */

  // Redirects user to the public link of the portfolio whose index is at portfolioIndex
  async function handleView(portfolioId) {
    // Get the current user, logs out if access token no longer valid
    // Go to the designated route for the public portfolio
    window.open(`/public/${portfolioId}/0`)
  }

  /* ----------------------------- Edit Portfolio ----------------------------- */

  // Redirects user to EditPortfolioPage to edit the portfolio whose ID is portfolioId
  function handleEdit(portfolioId) {
    // Set portfolioId in session storage so EditPortfolioPage will fetch
    // portfolio from DB based on this ID
    setPortfolioId(portfolioId)
    history.push('/portfolios/edit')
  }

  /* ---------------------------- Delete Portfolio ---------------------------- */

  // Deletes the portfolio at whose ID is portfolioID, and closes the dialog
  async function handleDelete(portfolioId) {
    if (portfolioId) {
      // Delete the portfolio from the portfolios DB
      deletePortfolio({ portfolioId })

      enqueueSnackbar(
        intl.formatMessage({ id: 'deletedPortfolio' }, { portfolioTitle: clickedPortfolio.title }),
        {
          variant: 'error'
        }
      )
    }

    setOpen(false)
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Dialog                                   */
  /* -------------------------------------------------------------------------- */

  const [open, setOpen] = useState(false)
  const [dialogType, setDialogType] = useState('delete')
  const [clickedPortfolio, setClickedPortfolio] = useState({ id: '', title: '', index: 0 })

  // Opens the dialog according to the dialog type, for the portfolio with the
  // id parameter as its portfolio ID, as well as its title and index
  function handleClick(type, id, title, index) {
    setClickedPortfolio({ id, title, index })
    setDialogType(type)
    setOpen(true)
  }

  // Closes the dialog, called on the Close event triggered by the Dialog
  function handleClose() {
    setOpen(false)
  }

  // Clicking the Copy button copies the public link to the clicked portfolio
  function copyToClipboard(e) {
    navigator.clipboard.writeText(
      user ? `http://bs-frontend.herokuapp.com/public/${clickedPortfolio.id}/0` : ''
    )

    enqueueSnackbar(intl.formatMessage({ id: 'copiedURLToClipboard' }), {
      variant: 'info'
    })

    setOpen(false)
  }

  // Object with the dialog type as the key, and the corresponding JSX contents
  // to be shown
  const dialogContent = {
    /* -------------------------------------------------------------------------- */
    // Dialog to show when share button is pressed, shows URL and copy URL button
    share: (
      <div>
        {/*
         * TITLE
         */}
        <DialogTitle id='form-dialog-title'>
          {intl.formatMessage({ id: 'sharePortfolio' })}
        </DialogTitle>

        <DialogContent>
          <Grid container direction='row' justify='center' alignItems='center' spacing={1}>
            {/*
             * URL LINK
             */}
            <Grid item>
              <TextField
                onFocus={(e) => e.target.select()}
                onCopy={() => {
                  navigator.clipboard.writeText(
                    user ? `http://bs-frontend.herokuapp.com/${clickedPortfolio.id}` : ''
                  )
                  enqueueSnackbar(intl.formatMessage({ id: 'copiedURLToClipboard' }), {
                    variant: 'info'
                  })
                  setOpen(false)
                }}
                variant='outlined'
                label={intl.formatMessage({ id: 'url' })}
                defaultValue={
                  user ? `http://bs-frontend.herokuapp.com/public/${clickedPortfolio.id}/0` : ''
                }
                readOnly
                className={classes.urlField}
              />
            </Grid>
            {/*
             * COPY URL BUTTON
             */}
            <Grid item>
              <Tooltip title={intl.formatMessage({ id: 'copy' })} placement='top'>
                <IconButton onClick={copyToClipboard}>
                  <FilterNoneOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </DialogContent>
      </div>
    ),
    /* -------------------------------------------------------------------------- */
    // Dialog to show when delete (trash can) icon  is pressed, shows
    // confirmation to delete
    delete: (
      <form onSubmit={() => handleDelete(clickedPortfolio.id)}>
        {/*
         * TITLE
         */}
        <DialogTitle id='form-dialog-title'>
          {intl.formatMessage({ id: 'deletePortfolio' })}
        </DialogTitle>
        {/*
         * CONTENT
         */}
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {intl.formatMessage(
              { id: 'deletePortfolioPrompt' },
              { portfolio: <span style={{ fontWeight: 'bold' }}>{clickedPortfolio.title}</span> }
            )}
          </DialogContentText>
        </DialogContent>
        {/*
         * BUTTONS
         */}
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>
            {intl.formatMessage({ id: 'cancel' })}
          </Button>
          <Button onClick={() => handleDelete(clickedPortfolio.id)} variant='contained'>
            {intl.formatMessage({ id: 'delete' })}
          </Button>
        </DialogActions>
      </form>
    )
  }

  const dialog = <CustomDialog open={open} setOpen={setOpen} content={dialogContent[dialogType]} />

  /* -------------------------------------------------------------------------- */
  /*                               Portfolio List                               */
  /* -------------------------------------------------------------------------- */

  return (
    <Grid item container xs={xs} md={md} lg={lg} direction='row'>
      <Paper className={fixedHeightPaper}>
        {/*
         * ADD PORTFOLIO BUTTON
         */}
        <Grid item className={floatingTopContainer}>
          <Fab
            color='secondary'
            variant='extended'
            aria-label={intl.formatMessage({ id: 'addPortfolio' })}
            onClick={handleAdd}
          >
            {intl.formatMessage({ id: 'addPortfolio' })}
            <AddIcon className={classes.addPortfolioIcon} />
          </Fab>
        </Grid>
        {/*
         * PORTFOLIO LIST
         */}

        {portfoliosStatus === 'success' ? (
          <Grid item>
            <Grid container>
              {/*
               * LIST OF PORTFOLIO CARDS
               */}
              <TransitionGroup style={{ width: '100%', height: '100%' }}>
                {portfolios.map((portfolio, idx) => (
                  <CSSTransition key={portfolio.id} classNames='fade' timeout={500}>
                    <Grid key={idx} item xs={12} className={classes.portfolio}>
                      {/*
                       * PORTFOLIO CARD
                       */}
                      <PortfolioCard
                        index={idx}
                        portfolio={portfolio}
                        viewPortfolio={handleView}
                        editPortfolio={handleEdit}
                        sharePortfolio={handleClick}
                        deletePortfolio={handleClick}
                      />
                    </Grid>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </Grid>

            {/* DIALOG */}
            {dialog}
          </Grid>
        ) : (
          <div></div>
        )}
      </Paper>
    </Grid>
  )
}

export default withStyles(transitions)(PortfolioListPage)
