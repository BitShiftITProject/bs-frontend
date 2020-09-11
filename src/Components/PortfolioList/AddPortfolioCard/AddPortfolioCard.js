import React from 'react'
import clsx from 'clsx'
import { loggedInStyles } from '../../loggedInStyles'
import { CardActionArea, Typography, Card, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useHistory } from 'react-router-dom'

export default function AddPortfolioCard(props) {
  const history = useHistory()
  const classes = loggedInStyles()

  const addPortfolioCard = clsx(classes.addPortfolioContainer, classes.portfolioCard)

  const handleClick = (e) => {
    history.push('/portfolio/add')

  }
  return (
    <Card className={addPortfolioCard}>
      <CardActionArea
        className={classes.addPortfolioContainer}
        onClick={() => handleClick()}
      >
        <Fab
          className={classes.addPortfolioFab}
          color='primary'
          variant='extended'
          aria-label='add portfolio'
        >
          Add Portfolio
          <AddIcon className={classes.addPortfolioIcon} />
        </Fab>
      </CardActionArea>
    </Card>
  )
}
