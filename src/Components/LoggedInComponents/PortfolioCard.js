import React from 'react'
import { loggedInStyles } from '../loggedInStyles'
import { CardActionArea, CardMedia, CardContent, Typography, Card } from '@material-ui/core'

export default function PortfolioCard(props) {
  // Contains all styling
  const classes = loggedInStyles()

  // Title and description, passed down from PortfolioCardList
  const { title, desc } = props

  return (
    <Card className={classes.portfolioCard}>
      <CardActionArea className={classes.portfolioActionArea}>
        <CardMedia src='/' className={classes.portfolioCardMedia} />
        <CardContent className={classes.portfolioCardContent}>
          <Typography gutterBottom variant='h5' component='h2'>
            {title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {desc}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
