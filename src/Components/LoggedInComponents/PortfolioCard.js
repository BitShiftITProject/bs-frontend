import React from 'react'
import { CursorTypography } from '../loggedInStyles'
import {
  CardMedia,
  CardContent,
  Card,
  Button,
  Grid,
  CardActions,
  IconButton,
  makeStyles,
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
    [theme.breakpoints.up('lg')]: {
      height: 350,
    },
    '& .MuiCardContent-root:last-child': {
      paddingBottom: 0,
    },
  },

  portfolioContent: {
    height: 'auto',
    [theme.breakpoints.up('lg')]: {
      height: 100,
    },
    overflow: 'scroll',
  },

  portfolioCardMedia: {
    height: 200,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}))

export default function PortfolioCard(props) {
  // Contains all styling
  const classes = useStyles()

  /* -------------------------------------------------------------------------- */
  /*                       Portfolio Details and Handlers                       */
  /* -------------------------------------------------------------------------- */
  // Passed down from PortfolioCardList

  const { portfolioId, title, desc, viewPortfolio, editPortfolio, deletePortfolio } = props

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
        <CardMedia src='/' className={classes.portfolioCardMedia} />
        <CardContent className={classes.portfolioContent}>
          <CursorTypography gutterBottom variant='h5' component='h2'>
            {title}
          </CursorTypography>
          <CursorTypography variant='body2' color='textSecondary' component='p'>
            {desc}
          </CursorTypography>
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
