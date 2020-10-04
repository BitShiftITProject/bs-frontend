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

import transitions from '../../Styles/transitions'
import PortfolioCard from './PortfolioCard'
import CustomDialog from '../CommonComponents/CustomDialog'
import { getUser, getUserPortfolios, deletePortfolio, logout } from '../../Backend/Fetch'
import { useIntl } from 'react-intl'

const useStyles = makeStyles((theme) => ({
  portfolio: {
    margin: theme.spacing(3)
  }
}))

const DraggablePortfolioList = ({ user, portfolios, setPortfolios }) => {
  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  const history = useHistory()

  async function handleView(portfolioId) {
    // Get the current user
    const user = await getUser()

    if (!user) logout()

    const portfolios = await getUserPortfolios(user.username).then((response) => response.json())

    // Get the portfolio from the user's portfolios array whose index === portfolioIndex
    let portfolioIndex = 0
    while (portfolioId !== portfolios[portfolioIndex].id) {
      portfolioIndex++
    }

    // Go to the designated route for public portfolios
    history.push(`/public/${user.username}/${portfolioIndex}/0`)
  }

  function handleEdit(portfolioId) {
    // Set portfolioId in session storage so EditPortfolioPage will fetch
    // portfolio from DB based on this ID
    window.sessionStorage.setItem('portfolioId', portfolioId)
    history.push('/portfolios/edit')
  }

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
  /*                                   Styling                                  */
  /* -------------------------------------------------------------------------- */

  const classes = useStyles()

  /* -------------------------------------------------------------------------- */
  /*                                   Dialog                                   */
  /* -------------------------------------------------------------------------- */

  const [open, setOpen] = useState(false)
  const [dialogType, setDialogType] = useState('delete')
  const [clickedPortfolio, setClickedPortfolio] = useState({ id: '', title: '', index: 0 })
  const intl = useIntl()

  function handleClick(type, id, title, index) {
    setClickedPortfolio({ id, title, index })
    setDialogType(type)
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  function copyToClipboard(e) {
    navigator.clipboard.writeText(
      user ? `http://bs-frontend.herokuapp.com/${user.username}/${clickedPortfolio.index}/0` : ''
    )
  }

  const dialogContent = {
    /* -------------------------------------------------------------------------- */
    // Dialog to show when share button is pressed, shows URL and copy URL button
    share: (
      <div>
        <DialogTitle id='form-dialog-title'>
          {intl.formatMessage({ id: 'sharePortfolio' })}
        </DialogTitle>
        <DialogContent>
          <Grid container direction='row' justify='center' alignItems='center' spacing={1}>
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
    // Dialog to show when delete icon (trash can) is pressed, shows
    // confirmation to delete
    delete: (
      <form onSubmit={() => handleDelete(clickedPortfolio.id)}>
        <DialogTitle id='form-dialog-title'>
          {intl.formatMessage({ id: 'deletePortfolio' })}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {intl.formatMessage(
              { id: 'deletePortfolioPrompt' },
              { portfolio: <span style={{ fontWeight: 'bold' }}>{clickedPortfolio.title}</span> }
            )}
          </DialogContentText>
        </DialogContent>
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
        <TransitionGroup style={{ width: '100%', height: '100%' }}>
          {portfolios.map((portfolio, idx) => (
            <CSSTransition key={portfolio.id} classNames='fade' timeout={500}>
              <Grid key={idx} item xs={12} className={classes.portfolio}>
                {/*
                 * PORTFOLIO CARD: Need to change portfolioId to appropriate Id
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
      {dialog}
    </Grid>
  )
}

export default withStyles(transitions)(DraggablePortfolioList)
