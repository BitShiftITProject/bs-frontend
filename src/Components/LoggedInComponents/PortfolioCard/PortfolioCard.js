import React from 'react'
import { useStyles } from '../../useStyles'
import { CardActionArea, CardMedia, CardContent, Typography, Card } from '@material-ui/core'

export default function PortfolioCard(props) {
  const classes = useStyles()

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
