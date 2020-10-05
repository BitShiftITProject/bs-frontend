import React, { useState } from 'react'
import {
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
import { useHistory } from 'react-router-dom'
// import { Droppable, Draggable } from 'react-beautiful-dnd'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import transitions from '../../../Styles/transitions'
import PortfolioCard from './PortfolioCard'
import CustomDialog from '../../CommonComponents/CustomDialog'
import { getUser, deletePortfolio, logout } from '../../../Backend/Fetch'
import { useIntl } from 'react-intl'

/* -------------------------------------------------------------------------- */
/*                                   Styling                                  */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles((theme) => ({
  portfolio: {
    margin: theme.spacing(3)
  }
}))

const DraggablePortfolioList = ({ user, portfolios, setPortfolios }) => {
  const classes = useStyles()

  const history = useHistory()

  /* -------------------------------------------------------------------------- */
  /*                          Portfolio Event Handlers                          */
  /* -------------------------------------------------------------------------- */

  /* ----------------------------- View Portfolio ----------------------------- */

  // Redirects user to the public link of the portfolio whose index is at portfolioIndex
  async function handleView(portfolioIndex) {
    // Get the current user, logs out if access token no longer valid
    const user = await getUser()
    if (!user) logout()

    // Go to the designated route for the public portfolio
    history.push(`/public/${user.username}/${portfolioIndex}/0`)
  }

  /* ----------------------------- Edit Portfolio ----------------------------- */

  // Redirects user to EditPortfolioPage to edit the portfolio whose ID is portfolioId
  function handleEdit(portfolioId) {
    // Set portfolioId in session storage so EditPortfolioPage will fetch
    // portfolio from DB based on this ID
    window.sessionStorage.setItem('portfolioId', portfolioId)
    history.push('/portfolios/edit')
  }

  /* ---------------------------- Delete Portfolio ---------------------------- */

  // Deletes the portfolio at whose ID is portfolioID, and closes the dialog
  async function handleDelete(portfolioId) {
    if (portfolioId) {
      // Get the new list of portfolio IDs
      const newPortfolioIds = portfolios
        .map((portfolioObj) => portfolioObj.id)
        .filter((id) => id !== portfolioId)

      // Create a temporary Set item for it, used to filter the current portfolios
      // state array, which consists of the portfolio objects (not just IDs)
      const newPortfolioIdsSet = new Set(newPortfolioIds)
      const newPortfolios = portfolios.filter((portfolioObj) =>
        newPortfolioIdsSet.has(portfolioObj.id)
      )

      // Set the portfolios state as the new list of portfolio objects, which does
      // not have the to-be-deleted portfolio
      setPortfolios(newPortfolios)

      // Delete the portfolio from the portfolios DB
      await deletePortfolio(portfolioId)
    }

    setOpen(false)
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Dialog                                   */
  /* -------------------------------------------------------------------------- */

  const [open, setOpen] = useState(false)
  const [dialogType, setDialogType] = useState('delete')
  const [clickedPortfolio, setClickedPortfolio] = useState({ id: '', title: '', index: 0 })
  const intl = useIntl()

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
      user ? `http://bs-frontend.herokuapp.com/${user.username}/${clickedPortfolio.index}/0` : ''
    )
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
                variant='outlined'
                label={intl.formatMessage({ id: 'url' })}
                defaultValue={
                  user
                    ? `http://bs-frontend.herokuapp.com/${user.username}/${clickedPortfolio.index}/0`
                    : ''
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
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */

  return (
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
                  portfolioId={portfolio.id}
                  title={portfolio.title}
                  index={idx}
                  description={portfolio.description}
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
  )
}

export default withStyles(transitions)(DraggablePortfolioList)
