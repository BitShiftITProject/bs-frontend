import React from 'react'
import { loggedInStyles } from '../loggedInStyles'
import { CardMedia, CardContent, Typography, Card, Button, Grid } from '@material-ui/core'

export default function PortfolioCard(props) {
  // Contains all styling
  const classes = loggedInStyles()

  // Title and description, passed down from PortfolioCardList
  const { title, desc } = props

  return (
    <Card className={classes.portfolioCard}>
      <div className={classes.portfolioCardActionArea}>
        <CardMedia src='/' className={classes.portfolioCardMedia} />
        <CardContent className={classes.portfolioCardContent}>
          <Grid container direction='row'>
            <Grid item xs={10} className={classes.portfolioDesc}>
              <Typography gutterBottom variant='h6' component='h3'>
                {title}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {desc}
              </Typography>
            </Grid>
            <Grid item container direction='column' xs={2}>
              <Button size='small' color='primary'>
                View
              </Button>
              <Button size='small' color='primary'>
                Edit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </div>
    </Card>
  )
}
