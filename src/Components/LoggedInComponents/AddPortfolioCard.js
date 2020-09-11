import React from 'react'
import clsx from 'clsx'
import { loggedInStyles } from '../loggedInStyles'
import { CardActionArea, Card, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

export default function AddPortfolioCard(props) {
  // The function to be called when add portfolio button is clicked,
  // passed down from PortfolioCardList
  const { handleClick } = props

  // Contains all styling
  const classes = loggedInStyles()

  // The card uses the styles of a normal portfolio card, but overrides
  // its height when the browser width reaches the small breakpoint:
  // On and below the small breakpoint, the Add Portfolio card height is shortened
  // as the cards in the card list will take the entire view width. Done to
  // avoid too much scrolling to reach other cards.
  const addPortfolioCard = clsx(classes.addPortfolioContainer, classes.portfolioCard)

  return (
    <Card className={addPortfolioCard}>
      <CardActionArea className={classes.addPortfolioContainer} onClick={handleClick}>
        {/**
         * ADD PORTFOLIO BUTTON
         */}
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
