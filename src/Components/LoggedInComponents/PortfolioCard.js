import React from 'react'
import { loggedInStyles } from '../loggedInStyles'
import {
  CardMedia,
  CardContent,
  Typography,
  Card,
  Button,
  Grid,
  CardActions,
  // CardActionArea,
  // Fab,
  IconButton,
  // Menu,
  // MenuItem,
} from '@material-ui/core'

// import MoreVertIcon from '@material-ui/icons/MoreVert'
import ShareIcon from '@material-ui/icons/Share'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'

export default function PortfolioCard(props) {
  // Contains all styling
  const classes = loggedInStyles()

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

  // Menu
  // const ITEM_HEIGHT = 48
  // const [anchorEl, setAnchorEl] = useState(null)
  // const open = Boolean(anchorEl)

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget)
  // }

  // const handleClose = () => {
  //   setAnchorEl(null)
  // }

  // const menu = (
  //   <Grid>
  //     <IconButton onClick={handleClick}>
  //       <MoreVertIcon />
  //     </IconButton>
  //     <Menu
  //       id='long-menu'
  //       anchorEl={anchorEl}
  //       keepMounted
  //       open={open}
  //       onClose={handleClose}
  //       PaperProps={{
  //         style: {
  //           maxHeight: ITEM_HEIGHT * 4.5,
  //           width: '10ch',
  //         },
  //       }}
  //     >
  //       {/*
  //        * All MenuItems must have the portfolio ID as the value
  //        */}
  //       {Object.keys(options).map((option) => (
  //         <MenuItem key={option} onClick={options[option]}>
  //           {option}
  //         </MenuItem>
  //       ))}
  //     </Menu>
  //   </Grid>
  // )

  // const options = { Delete: handleDelete }
  return (
    <Card className={classes.portfolioCard}>
      <Grid container spacing={1} direction='column'>
        <CardMedia src='/' className={classes.portfolioCardMedia} />
        <CardContent className={classes.portfolioContent}>
          <Typography gutterBottom variant='h5' component='h2'>
            {title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {desc}
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
