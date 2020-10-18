import React, { useState, useEffect } from 'react'
import {
  CardContent,
  Card,
  Button,
  Grid,
  CardActions,
  IconButton,
  Typography,
  makeStyles,
  Tooltip
} from '@material-ui/core'

import ShareIcon from '@material-ui/icons/Share'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import { useIntl } from 'react-intl'
import { loggedInStyles } from '../../../Styles/loggedInStyles'
import { getPortfolioPages } from '../../../Backend/Fetch'

/* -------------------------------------------------------------------------- */
/*                                   Styling                                  */
/* -------------------------------------------------------------------------- */

const useStyles = makeStyles((theme) => ({
  portfolioCard: {
    width: '100%',
    height: 'auto',
    '& .MuiCardContent-root:last-child': {
      paddingBottom: 0
    },
    backgroundColor: theme.palette.background.paperLight,
    boxShadow: 'none',
    // transition: 'background-color 0.1s ease-in-out',
    '&:hover': {
      backgroundColor: theme.palette.background.paperHover,
      transition: 'background-color 0.1s ease-in-out'
    }
  },

  portfolioContent: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(3)
  },

  portfolioCardMedia: {
    height: 200,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },

  portfolioText: {
    color: theme.palette.text.primary,
    fontWeight: 'lighter',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  portfolioActions: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    '& .MuiButton-root': {
      borderRadius: '30px'
    },
    '& .MuiIconButton-root': {
      padding: theme.spacing(1)
    }
  }
}))

const PortfolioCard = (props) => {
  const classes = useStyles()
  const style = loggedInStyles()

  /* -------------------------------------------------------------------------- */
  /*                                   Locale                                   */
  /* -------------------------------------------------------------------------- */

  const intl = useIntl()

  /* -------------------------------------------------------------------------- */
  /*                       Portfolio Details and Handlers                       */
  /* -------------------------------------------------------------------------- */
  // Passed down from PortfolioList

  const { index, portfolio, viewPortfolio, editPortfolio, sharePortfolio, deletePortfolio } = props

  const getPageCount = async () => {
    return getPortfolioPages(portfolio.id).then((pages) => pages.length)
  }

  const [hasPages, setHasPages] = useState(false)

  useEffect(() => {
    getPageCount().then((pageCount) => {
      setHasPages(pageCount > 0)
    })
  }, [])

  const handleView = () => {
    viewPortfolio(portfolio.id)
  }

  const handleEdit = () => {
    editPortfolio(portfolio.id)
  }

  return (
    <Card className={classes.portfolioCard}>
      {/* -------------------------------------------------------------------------- */}
      <Grid container spacing={1} direction='column'>
        <CardContent className={classes.portfolioContent}>
          {/*
           * PORTFOLIO TITLE
           */}
          <Typography
            className={classes.portfolioText}
            style={{
              cursor: 'default'
            }}
            variant='h5'
            component='h2'
          >
            {portfolio.title}
          </Typography>
          {/*
           * PORTFOLIO DESCRIPTION
           */}
          <Typography
            className={classes.portfolioText}
            variant='body2'
            color='textSecondary'
            component='p'
          >
            {portfolio.description}
          </Typography>
        </CardContent>
      </Grid>

      <CardActions className={classes.portfolioActions}>
        {/* -------------------------------------------------------------------------- */}
        <Grid
          item
          xs={7}
          container
          direction='row'
          spacing={1}
          justify='flex-start'
          alignItems='center'
        >
          {/*
           * VIEW PORTFOLIO BUTTON
           */}
          <Grid item>
            <Tooltip
              title={hasPages ? '' : intl.formatMessage({ id: 'viewPortfolioError' })}
              placement='bottom'
            >
              <span>
                <Button size='small' onClick={handleView} disabled={!hasPages}>
                  {intl.formatMessage({ id: 'view' })}
                </Button>
              </span>
            </Tooltip>
          </Grid>
          {/*
           * EDIT PORTFOLIO BUTTON
           */}
          <Grid item>
            <Button size='small' onClick={handleEdit}>
              {intl.formatMessage({ id: 'edit' })}
            </Button>
          </Grid>
        </Grid>
        {/* -------------------------------------------------------------------------- */}
        <Grid
          item
          xs={5}
          container
          direction='row'
          spacing={1}
          justify='flex-end'
          alignItems='center'
        >
          {/*
           * SHARE PORTFOLIO BUTTON
           */}
          <Grid item>
            <Tooltip
              title={
                hasPages
                  ? intl.formatMessage({ id: 'share' })
                  : intl.formatMessage({ id: 'sharePortfolioError' })
              }
              placement='bottom'
            >
              <span>
                <IconButton
                  disabled={!hasPages}
                  className={style.share}
                  onClick={(e) => sharePortfolio('share', portfolio.id, portfolio.title, index)}
                >
                  <ShareIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Grid>
          {/*
           * DELETE PORTFOLIO BUTTON
           */}
          <Grid item>
            <Tooltip title={intl.formatMessage({ id: 'delete' })} placement='bottom'>
              <IconButton
                className={style.delete}
                onClick={(e) => deletePortfolio('delete', portfolio.id, portfolio.title, index)}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}

export default PortfolioCard
