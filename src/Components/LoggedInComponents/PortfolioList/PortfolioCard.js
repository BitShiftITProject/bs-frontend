import React from 'react'
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

  const {
    portfolioId,
    title,
    description,
    index,
    viewPortfolio,
    editPortfolio,
    sharePortfolio,
    deletePortfolio
  } = props

  const handleView = () => {
    viewPortfolio(index)
  }

  const handleEdit = () => {
    editPortfolio(portfolioId)
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
            {title}
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
            {description}
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
            <Button size='small' onClick={handleView}>
              {intl.formatMessage({ id: 'view' })}
            </Button>
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
            <Tooltip title={intl.formatMessage({ id: 'share' })} placement='top'>
              <IconButton
                className={style.share}
                onClick={(e) => sharePortfolio('share', portfolioId, title, index)}
              >
                <ShareIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          {/*
           * DELETE PORTFOLIO BUTTON
           */}
          <Grid item>
            <Tooltip title={intl.formatMessage({ id: 'delete' })} placement='top'>
              <IconButton
                className={style.delete}
                onClick={(e) => deletePortfolio('delete', portfolioId, title, index)}
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
