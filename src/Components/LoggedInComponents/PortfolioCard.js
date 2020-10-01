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

const useStyles = makeStyles((theme) => ({
  /* -------------------------------------------------------------------------- */
  /*                               Portfolio Card                               */
  /* -------------------------------------------------------------------------- */

  portfolioCard: {
    width: '100%',
    height: 'auto',
    '& .MuiCardContent-root:last-child': {
      paddingBottom: 0
    }
  },

  portfolioContent: {
    padding: theme.spacing(3)
  },

  portfolioCardMedia: {
    height: 200,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },

  portfolioText: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))

const PortfolioCard = (props) => {
  // Contains all styling
  const classes = useStyles()

  // Localisation for languages
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
    viewPortfolio(portfolioId)
  }

  const handleEdit = () => {
    editPortfolio(portfolioId)
  }

  return (
    <Card className={classes.portfolioCard}>
      <Grid container spacing={1} direction='column'>
        <CardContent className={classes.portfolioContent}>
          <Typography className={classes.portfolioText} variant='h5' component='h2'>
            {title}
          </Typography>
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

      <CardActions>
        <Grid container justify='space-between' alignItems='center'>
          <Grid>
            <Button size='small' onClick={handleView}>
              {intl.formatMessage({ id: 'view' })}
            </Button>
            <Button size='small' onClick={handleEdit}>
              {intl.formatMessage({ id: 'edit' })}
            </Button>
          </Grid>
          <Grid>
            <Tooltip title={intl.formatMessage({ id: 'share' })} placement='top'>
              <IconButton onClick={(e) => sharePortfolio('share', portfolioId, title, index)}>
                <ShareIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={intl.formatMessage({ id: 'delete' })} placement='top'>
              <IconButton onClick={(e) => deletePortfolio('delete', portfolioId, title, index)}>
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
