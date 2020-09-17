import React, { useEffect, useState } from 'react'

import { loggedInStyles, PaddedFormGrid, CursorTypography } from '../loggedInStyles'
import CustomDialog from './CustomDialog'

import {
  Grid,
  Paper,
  Fab,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import CloseIcon from '@material-ui/icons/Close'
import Sidebar from './Sidebar'

import { BACKEND, PORTFOLIOS } from '../../Endpoints'
import { useHistory } from 'react-router-dom'

export default function EditPortfolioPage() {
  /* -------------------------------------------------------------------------- */
  /*                         Fetching Current Portfolio                         */
  /* -------------------------------------------------------------------------- */

  const history = useHistory()
  const portfolioId = window.sessionStorage.getItem('portfolioId')
  const [portfolio, setPortfolio] = useState({})
  const [paragraph, setParagraph] = useState('')

  useEffect(() => {
    async function fetchPortfolio() {
      const response = await fetch(BACKEND + PORTFOLIOS + '/' + portfolioId, {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          'Content-type': 'application/json'
        }
      })
      const portfolio = await response.json()
      return portfolio
    }
    fetchPortfolio().then((portfolio) => {
      setPortfolio({ ...portfolio })
      setParagraph(portfolio.pages.content || '')
    })
  }, [])

  /* -------------------------------------------------------------------------- */
  /*                             State and Handlers                             */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   Styles                                   */
  /* -------------------------------------------------------------------------- */

  const classes = loggedInStyles()
  const fixedHeightPaper = classes.fixedHeightPaper
  const leftPanel = classes.leftPanel

  /* -------------------------------------------------------------------------- */
  /*                                   Dialog                                   */
  /* -------------------------------------------------------------------------- */

  const [open, setOpen] = useState(false)
  const [dialogContent, setDialogContent] = useState({ type: '', target: '' })

  const patchPortfolio = (patchDetails) => {
    fetch(BACKEND + PORTFOLIOS + '/' + portfolioId, {
        method: 'PATCH',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(patchDetails)
    })
  }

  const handleClick = (name, value) => {
    setDialogContent({ type: name, target: value })
    setOpen(true)
  }

  const handleEdit = (e) => {
    e.preventDefault()
    patchPortfolio({"title":portfolio.title, "description":portfolio.description});
    setOpen(false)
  }

  const handleDelete = () => {
    alert(`Deleted ${dialogContent.target}!`)
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  async function handleSubmit() {
    // TODO: PATCH request to /portfolios/{portfolioId}
    /* -------------------------------------------------------------------------- */
    // portfolioId was set in sessionStorage, either in:
    // - AddPortfolioPage, when the add portfolio button is clicked (in
    //   handleSubmit)
    // - PortfolioCardList, when the edit button of the portfolio is clicked (in
    //   handleEdit)
    /* -------------------------------------------------------------------------- */
    // For now the portfolio object retrieved from the GET request contains a
    // pages attribute, which is an object.
    // The content of the paragraph should be within a 'content' attribute in
    // this pages object:
    // portfolios = {<other attrs...>, pages: {content: <paragraph content
    // here>}}
    /* -------------------------------------------------------------------------- */
    // I made it so that the state of the paragraph content is modified and kept in
    // the 'paragraph' variable, updated using the 'setParagraph' method.
    // So when sending a PATCH request, the body should be JSON.stringify({pages: {content: paragraph}})
    patchPortfolio({"pages":{"content":paragraph}});
    history.push('/portfolios');
  }

  const dialogType = {
    title: (
      <form onSubmit={handleEdit}>
        <DialogTitle id='form-dialog-title'>Edit portfolio</DialogTitle>
        <DialogContent>
          <TextField
            className={classes.formLabel}
            InputLabelProps={{
              shrink: true
            }}
            autoFocus
            margin='dense'
            id='portfolioName'
            label='Title'
            fullWidth
            value={portfolio.title}
            onChange={(e) => setPortfolio({...portfolio, title: e.target.value})}
          />
          <TextField
            className={classes.formLabel}
            InputLabelProps={{
              shrink: true
            }}
            autoFocus
            margin='dense'
            id='portfolioDesc'
            label='Description'
            fullWidth
            value={portfolio.description}
            onChange={(e) => setPortfolio({...portfolio, description: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>
            Cancel
          </Button>
          <Button onClick={handleEdit} variant='contained'>
            Save
          </Button>
        </DialogActions>
      </form>
    ),
    page: (
      <form onSubmit={handleEdit}>
        <DialogTitle id='form-dialog-title'>Edit page</DialogTitle>
        <DialogContent>
          <TextField
            className={classes.formLabel}
            InputLabelProps={{
              shrink: true
            }}
            autoFocus
            label='Title'
            margin='dense'
            id='pageName'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>
            Cancel
          </Button>
          <Button onClick={handleEdit} variant='contained'>
            Save
          </Button>
        </DialogActions>
      </form>
    ),
    delete: (
      <div>
        <DialogTitle id='alert-dialog-title'>{'Delete this page?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete the{' '}
            <span style={{ fontWeight: 'bold' }}>{dialogContent.target}</span> page?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary' variant='outlined'>
            Cancel
          </Button>
          <Button onClick={handleDelete} color='error' variant='container' autoFocus>
            Delete
          </Button>
        </DialogActions>
      </div>
    )
  }

  const dialog = (
    <CustomDialog open={open} setOpen={setOpen} content={dialogType[dialogContent.type]} />
  )

  /* -------------------------------------------------------------------------- */
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */

  const content = (
    <Grid container direction='row' spacing={0}>
      {/*
       * LIST MENU
       */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={leftPanel}>
          {/*
           * LIST MENU CONTENT
           */}
          <Grid style={{ width: '100%', height: '100%' }}>
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
              <CursorTypography variant='button'>{portfolio.title}</CursorTypography>
              <Fab
                color='primary'
                size='small'
                onClick={() => handleClick('title', portfolio.title)}
              >
                <CreateIcon />
              </Fab>
            </Grid>
            <Divider orientation='horizontal' />

            {/* Each Portfolio object in the DB has a pages attribute.
             * This attribute is currently temporarily set as an object.
             */}

            {/*
             * PORTFOLIO PAGES
             */}

            <Grid container direction='column' justify='space-evenly' className={classes.padded}>
              <CursorTypography variant='overline'>Pages</CursorTypography>
              <List>
                {/*portfolio.pages &&
                  portfolio.pages.map((page, idx) => (
                    <ListItem key={idx} button className={classes.hiddenButtonItem}>
                      <ListItemText onClick={() => {}}>{page.name}</ListItemText>
                      <Fab
                        color='primary'
                        size='small'
                        className={classes.hiddenButton}
                        onClick={() => handleClick('page', page.item)}
                      >
                        <CreateIcon />
                      </Fab>
                      <Fab
                        color='primary'
                        size='small'
                        className={classes.hiddenButton}
                        onClick={() => handleClick('delete', page.item)}
                      >
                        <CloseIcon />
                      </Fab>
                    </ListItem>
                  ))*/}
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/*
       * PAGE SECTIONS
       */}

      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          {/*
           * PAGE CONTENT
           */}
          <Grid
            item
            xs={12}
            container
            direction='column'
            justify='space-between'
            style={{ height: '100%', overflow: 'scroll' }}
          >
            <form>
              <Grid container direction='column'>
                <PaddedFormGrid item>
                  <TextField
                    className={classes.formLabel}
                    InputLabelProps={{
                      shrink: true
                    }}
                    value={paragraph}
                    onChange={(e) => setParagraph(e.target.value)}
                    variant='outlined'
                    label='Paragraph'
                    fullWidth
                    multiline
                  ></TextField>
                </PaddedFormGrid>
              </Grid>
            </form>
          </Grid>
          {/*
           * SAVE CHANGES BUTTON
           */}
          <Grid item className={classes.floatingBottomContainer}>
            <Fab color='primary' variant='extended' onClick={handleSubmit}>
              <CursorTypography variant='button'>Save Changes</CursorTypography>
            </Fab>
          </Grid>
        </Paper>
      </Grid>
      {dialog}
    </Grid>
  )
  return <Sidebar content={content} />
}
