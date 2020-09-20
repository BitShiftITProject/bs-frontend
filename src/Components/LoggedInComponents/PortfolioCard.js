import React from 'react'
import {
  CardMedia,
  CardContent,
  Card,
  Button,
  Grid,
  CardActions,
  IconButton,
  Typography,
  makeStyles
} from '@material-ui/core'

import ShareIcon from '@material-ui/icons/Share'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'

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

  /* -------------------------------------------------------------------------- */
  /*                       Portfolio Details and Handlers                       */
  /* -------------------------------------------------------------------------- */
  // Passed down from PortfolioList

  const { portfolioId, title, description, viewPortfolio, editPortfolio, deletePortfolio } = props

  const handleView = () => {
    viewPortfolio(portfolioId)
  }

  const handleEdit = () => {
    editPortfolio(portfolioId)
  }

  const handleDelete = () => {
    deletePortfolio(portfolioId)
  }

  return (
    <Card className={classes.portfolioCard}>
      <Grid container spacing={1} direction='column'>
        {/*<CardMedia src='/' className={classes.portfolioCardMedia} />*/}
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
              View
            </Button>
            <Button size='small' onClick={handleEdit}>
              Edit
            </Button>
          </Grid>
          <Grid>
            <IconButton>
              <ShareIcon />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}

export default PortfolioCard
