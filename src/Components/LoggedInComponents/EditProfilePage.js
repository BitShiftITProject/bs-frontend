import React, { useState, useReducer, useEffect } from 'react'
import { v4 as uuid } from 'uuid'

import Sidebar from './Sidebar'

import { loggedInStyles, PaddedFormGrid } from '../../Styles/loggedInStyles'

import {
  Grid,
  Paper,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  TextField,
  Chip,
  Fab,
  makeStyles
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import PhoneIcon from '@material-ui/icons/Phone'
// import CloseIcon from '@material-ui/icons/Close'

import { BACKEND, USERS } from '../../Backend/Endpoints'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  /* -------------------------------------------------------------------------- */
  /*                              Edit Profile Page                             */
  /* -------------------------------------------------------------------------- */

  editProfileForm: {
    // '& .MuiGrid-root': {
    //   paddingBottom: theme.spacing(0),
    // },
    '& .MuiChip-root': {
      marginBottom: theme.spacing(0),
      marginTop: theme.spacing(0)
    },

    // '& .MuiTextField-root': {
    //   marginRight: theme.spacing(2),
    // },
    '& .MuiInputLabel-outlined:focus-': {
      overflow: 'hidden'
    }
  }
}))

// Initial About Me and Contact data, will be fetched from database for the
// currently authenticated user as the initial data in the states of the forms
const initialAbout = {
  first_name: '',
  last_name: '',
  occupation: '',
  description: '',
  tags: []
}

const initialContact = {
  email: '',
  address_line_1: '',
  address_line_2: '',
  phone: '',
  town_suburb: '',
  state: '',
  country: ''
}

// Reducer to update the state object
const reducer = (state, newState) => ({ ...state, ...newState })

export default function EditProfilePage() {
  /* -------------------------------------------------------------------------- */
  /*                          States and their Setters                          */
  /* -------------------------------------------------------------------------- */

  const [page, setPage] = useState()
  const [tagText, setTagText] = useState('')
  const [about, setAbout] = useReducer(reducer, initialAbout)
  const [contact, setContact] = useReducer(reducer, initialContact)

  /* -------------------------------------------------------------------------- */
  /*                         Fetching Initial User Data                         */
  /* -------------------------------------------------------------------------- */

  const emailId = window.sessionStorage.getItem('emailId')
  const history = useHistory()

  // TODO: Set up catch block for errors
  useEffect(() => {
    async function fetchUser() {
      if (!emailId) history.push('/login')

      const response = await fetch(BACKEND + USERS + '/' + emailId, {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          'Content-type': 'application/json'
        }
      })
      const user = response.json()
      return user
    }

    fetchUser().then((user) => {
      setAbout({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        occupation: user.occupation || '',
        description: user.description || '',
        tags: user.tags || []
      })
      setContact({
        profile_email: user.profile_email || user.email,
        company: user.company || '',
        address_line_1: user.address_line_1 || '',
        address_line_2: user.address_line_2 || '',
        phone: user.phone || '',
        town_suburb: user.town_suburb || '',
        postcode: user.postcode || '',
        state: user.state || '',
        country: user.country || ''
      })
    })
  }, [emailId, history])

  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  // Handles changes in any text input in the About Me form, reflects this
  // change in the 'about' state object
  const handleOnAboutChange = (event) => {
    const { name, value } = event.target
    setAbout({ [name]: value })
  }

  // Handles tag addition when Enter key is pressed in the Tags text input
  const handleAddTag = (event) => {
    if (event.key === 'Enter') {
      const { value } = event.target

      const newTags = about.tags.length
        ? [...about.tags, { id: uuid(), label: value }]
        : [{ id: uuid(), label: value }]

      setAbout({ tags: newTags })
      setTagText('')
    }
  }

  // Handles tag removal from the list of tags
  const handleRemoveTag = (id) => {
    const newTags = about.tags.filter((t) => t.id !== id)
    setAbout({ ...about, tags: newTags })
  }

  // Handles changes in any text input in the Contact form, reflects this change
  // in the 'contact' state object
  const handleOnContactChange = (event) => {
    const { name, value } = event.target
    setContact({ [name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!emailId) history.push('/login')

    const details = { ...about, ...contact }

    // TODO: Fortify catch block

    fetch(BACKEND + USERS + '/' + emailId, {
      method: 'PATCH',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(details)
    })
      .then((response) => {
        if (response.ok) console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Styling                                  */
  /* -------------------------------------------------------------------------- */

  // Used for general styles
  const classes = loggedInStyles()
  const editProfileForm = useStyles().editProfileForm

  // Used for the list menu containing the About Me and Contact options

  /* -------------------------------------------------------------------------- */
  /*                             Form to be Rendered                            */
  /* -------------------------------------------------------------------------- */

  // Switch between About Me and Contact options according to the 'page' state:
  // - Will render the About Me form if page === 'aboutMe'
  // - Will render the Contact form if page === 'contact'

  let form

  switch (page) {
    // Contact Form
    case 'contact':
      form = (
        <form className={editProfileForm} noValidate autoComplete='off'>
          <Grid item container spacing={0} direction='column'>
            <Grid item container justify='space-between'>
              {/**
               * CONTACT DETAILS: Email, Contact Number, Address, Town, State, Country
               */}
              <Chip label='Details' color='primary' />
              {/**
                <Fab size='small' aria-label='go back'>
                  <CloseIcon />
                </Fab>
                */}
            </Grid>
            <PaddedFormGrid item container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  className={classes.formLabel}
                  InputLabelProps={{
                    shrink: true
                  }}
                  fullWidth
                  label='Email'
                  type='email'
                  variant='outlined'
                  name='profile_email'
                  helperText='Changing this will not change your login email address'
                  value={contact.profile_email}
                  onChange={handleOnContactChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  className={classes.formLabel}
                  InputLabelProps={{
                    shrink: true
                  }}
                  fullWidth
                  label='Contact Number'
                  variant='outlined'
                  name='phone'
                  value={contact.phone}
                  onChange={handleOnContactChange}
                />
              </Grid>
            </PaddedFormGrid>
            <PaddedFormGrid item>
              <Grid item xs={12} className={classes.padded}>
                <TextField
                  className={classes.formLabel}
                  InputLabelProps={{
                    shrink: true
                  }}
                  fullWidth
                  label='Company'
                  variant='outlined'
                  name='company'
                  value={contact.company}
                  onChange={handleOnContactChange}
                />
              </Grid>
            </PaddedFormGrid>
            <PaddedFormGrid item container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  className={classes.formLabel}
                  InputLabelProps={{
                    shrink: true
                  }}
                  fullWidth
                  label='Address Line 1'
                  variant='outlined'
                  name='address_line_1'
                  value={contact.address_line_1}
                  onChange={handleOnContactChange}
                />
              </Grid>
              <Grid item container spacing={0} xs={12} md={6} justify='space-between'>
                <Grid item xs={7}>
                  <TextField
                    className={classes.formLabel}
                    InputLabelProps={{
                      shrink: true
                    }}
                    fullWidth
                    label='Town / Suburb'
                    variant='outlined'
                    name='town_suburb'
                    value={contact.town_suburb}
                    onChange={handleOnContactChange}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    className={classes.formLabel}
                    InputLabelProps={{
                      shrink: true
                    }}
                    fullWidth
                    label='Postcode'
                    variant='outlined'
                    name='postcode'
                    value={contact.postcode}
                    onChange={handleOnContactChange}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    className={classes.formLabel}
                    InputLabelProps={{
                      shrink: true
                    }}
                    fullWidth
                    label='State'
                    variant='outlined'
                    name='state'
                    value={contact.state}
                    onChange={handleOnContactChange}
                  />
                </Grid>
              </Grid>
            </PaddedFormGrid>
            <PaddedFormGrid item container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  className={classes.formLabel}
                  InputLabelProps={{
                    shrink: true
                  }}
                  fullWidth
                  label='Address Line 2'
                  variant='outlined'
                  name='address_line_2'
                  value={contact.address_line_2}
                  onChange={handleOnContactChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  className={classes.formLabel}
                  InputLabelProps={{
                    shrink: true
                  }}
                  fullWidth
                  label='Country'
                  variant='outlined'
                  name='country'
                  value={contact.country}
                  onChange={handleOnContactChange}
                />
              </Grid>
            </PaddedFormGrid>
          </Grid>
        </form>
      )
      break
    // About Me form
    default:
      form = (
        <form className={editProfileForm} noValidate autoComplete='off'>
          <Grid container spacing={0} direction='column'>
            {/**
             * ABOUT ME DETAILS: First Name, Last Name, Occupation
             */}
            <Grid item>
              <Chip label='Details' color='primary' />
            </Grid>
            <PaddedFormGrid item container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  className={classes.formLabel}
                  InputLabelProps={{
                    shrink: true
                  }}
                  fullWidth
                  label='First Name'
                  variant='outlined'
                  name='first_name'
                  value={about.first_name}
                  onChange={handleOnAboutChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  className={classes.formLabel}
                  InputLabelProps={{
                    shrink: true
                  }}
                  fullWidth
                  label='Last Name'
                  variant='outlined'
                  name='last_name'
                  value={about.last_name}
                  onChange={handleOnAboutChange}
                />
              </Grid>
            </PaddedFormGrid>
            <PaddedFormGrid item>
              <Grid item className={classes.padded}>
                <TextField
                  className={classes.formLabel}
                  InputLabelProps={{
                    shrink: true
                  }}
                  label='Occupation'
                  variant='outlined'
                  fullWidth
                  name='occupation'
                  value={about.occupation}
                  onChange={handleOnAboutChange}
                />
              </Grid>
            </PaddedFormGrid>
          </Grid>
          {/**
           * ABOUT ME DESCRIPTION
           */}
          <Grid item container spacing={0} direction='column'>
            <Grid item>
              <Chip label='Description' color='primary' />
            </Grid>
            <PaddedFormGrid item>
              <Grid item className={classes.padded}>
                <TextField
                  className={classes.formLabel}
                  InputLabelProps={{
                    shrink: true
                  }}
                  placeholder='Type something...'
                  fullWidth
                  multiline
                  rows={7}
                  variant='outlined'
                  name='description'
                  value={about.description}
                  onChange={handleOnAboutChange}
                />
              </Grid>
            </PaddedFormGrid>

            <Grid item container spacing={0} direction='column'>
              <Grid item>
                <Chip label='Tags' color='primary' />
              </Grid>
              {/**
               * ABOUT ME TAGS
               */}
              <PaddedFormGrid item>
                <Grid item className={classes.padded}>
                  <TextField
                    className={classes.formLabel}
                    InputLabelProps={{
                      shrink: true
                    }}
                    placeholder='Type and enter to add a tag...'
                    fullWidth
                    variant='outlined'
                    name='tagText'
                    value={tagText}
                    onChange={(e) => setTagText(e.target.value)}
                    onKeyDown={handleAddTag}
                  />
                </Grid>

                <Grid item container spacing={1} direction='row' className={classes.padded}>
                  {about.tags.map((t) => (
                    <Grid item key={t.id}>
                      <Chip
                        label={t.label}
                        variant='outlined'
                        onDelete={() => handleRemoveTag(t.id)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </PaddedFormGrid>
            </Grid>
          </Grid>
        </form>
      )
  }

  /* -------------------------------------------------------------------------- */
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */
  // Contains the form to be rendered

  const content = (
    <Grid container direction='row' spacing={0}>
      {/**
       * LIST MENU with About Me, Contact options
       */}
      <Grid item xs={12} md={3} lg={2}>
        <Paper className={classes.listMenu}>
          <List component='nav' aria-label='profile sections'>
            <ListItem button selected={page === 'aboutMe'} onClick={() => setPage('aboutMe')}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary='About Me' />
            </ListItem>
            <ListItem button selected={page === 'contact'} onClick={() => setPage('contact')}>
              <ListItemIcon>
                <PhoneIcon />
              </ListItemIcon>
              <ListItemText primary='Contact' />
            </ListItem>
          </List>
        </Paper>
      </Grid>
      {/**
       * FORM with user profile data
       */}
      <Grid item xs={12} md={9} lg={10} container direction='column' justify='space-between'>
        <Paper className={classes.fixedHeightPaper}>
          <Grid item style={{ overflow: 'scroll' }}>
            {form}
          </Grid>
          <Grid item className={classes.floatingBottomContainer}>
            <Fab variant='extended' aria-label='save changes' onClick={handleSubmit}>
              Save Changes
            </Fab>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )

  return <Sidebar content={content} />
}
