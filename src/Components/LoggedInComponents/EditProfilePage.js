import React, { useState, useReducer, useRef, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import clsx from 'clsx'

import Sidebar from './Sidebar'

import { loggedInStyles, PaddedFormGrid } from '../loggedInStyles'

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
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import PhoneIcon from '@material-ui/icons/Phone'
// import CloseIcon from '@material-ui/icons/Close'

// Initial About Me and Contact data, will be fetched from database for the
// currently authenticated user as the initial data in the states of the forms
const initialAbout = {
  firstName: '',
  lastName: '',
  occupation: '',
  description: '',
  tags: [],
}

const initialContact = {
  email: '',
  address1: '',
  address2: '',
  number: '',
  town: '',
  state: '',
  country: '',
}

// Reducer to update the state object
const reducer = (state, newState) => ({ ...state, ...newState })

export default function EditProfilePage() {
  /* -------------------------------------------------------------------------- */
  /*                         Fetching Initial User Data                         */
  /* -------------------------------------------------------------------------- */

  let profileRef = useRef({})

  // useEffect is run every time a component is updated

  useEffect(() => {
    // TODO: Set up fetch for current user's profile
    let profile = profileRef.current

    async function fetchProfile() {
      const accessToken = window.sessionStorage.accessToken
      // const response = await fetch().json()
      return {}
    }

    profile = fetchProfile()
  }, [])

  /* -------------------------------------------------------------------------- */
  /*                          States and their Setters                          */
  /* -------------------------------------------------------------------------- */

  const [page, setPage] = useState()
  const [tagText, setTagText] = useState('')
  const [about, setAbout] = useReducer(reducer, initialAbout)
  const [contact, setContact] = useReducer(reducer, initialContact)

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
    alert(page)
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Styling                                  */
  /* -------------------------------------------------------------------------- */

  // Used for general styles
  const classes = loggedInStyles()

  // Used for all Paper components to give consistent height and spacing
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  // Used for the list menu containing the About Me and Contact options
  const listMenu = clsx(fixedHeightPaper, classes.listMenu)

  /* -------------------------------------------------------------------------- */
  /*                             Form to be Rendered                            */
  /* -------------------------------------------------------------------------- */

  // Switch between About Me and Contact options according to the 'page' state

  let form

  switch (page) {
    // Contact Form
    case 'contact':
      form = (
        <form className={classes.editProfileForm} noValidate autoComplete='off'>
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
                    shrink: true,
                  }}
                  fullWidth
                  label='Email'
                  type='email'
                  variant='outlined'
                  name='email'
                  helperText='Changing this will not change your login email address'
                  value={contact.email}
                  onChange={handleOnContactChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  className={classes.formLabel}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  label='Contact Number'
                  variant='outlined'
                  name='number'
                  value={contact.number}
                  onChange={handleOnContactChange}
                />
              </Grid>
            </PaddedFormGrid>
            <PaddedFormGrid item>
              <Grid item xs={12} className={classes.singleForm}>
                <TextField
                  className={classes.formLabel}
                  InputLabelProps={{
                    shrink: true,
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
                    shrink: true,
                  }}
                  fullWidth
                  label='Address Line 1'
                  variant='outlined'
                  name='address1'
                  value={contact.address1}
                  onChange={handleOnContactChange}
                />
              </Grid>
              <Grid item container spacing={0} xs={12} md={6} justify='space-between'>
                <Grid item xs={7}>
                  <TextField
                    className={classes.formLabel}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    label='Town / Suburb'
                    variant='outlined'
                    name='town'
                    value={contact.town}
                    onChange={handleOnContactChange}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    className={classes.formLabel}
                    InputLabelProps={{
                      shrink: true,
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
                      shrink: true,
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
                    shrink: true,
                  }}
                  fullWidth
                  label='Address Line 2'
                  variant='outlined'
                  name='address2'
                  value={contact.address2}
                  onChange={handleOnContactChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  className={classes.formLabel}
                  InputLabelProps={{
                    shrink: true,
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
        <form className={classes.editProfileForm} noValidate autoComplete='off'>
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
                    shrink: true,
                  }}
                  fullWidth
                  label='First Name'
                  variant='outlined'
                  name='firstName'
                  value={about.firstName}
                  onChange={handleOnAboutChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  className={classes.formLabel}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  label='Last Name'
                  variant='outlined'
                  name='lastName'
                  value={about.lastName}
                  onChange={handleOnAboutChange}
                />
              </Grid>
            </PaddedFormGrid>
            <PaddedFormGrid item>
              <Grid item className={classes.singleForm}>
                <TextField
                  className={classes.formLabel}
                  InputLabelProps={{
                    shrink: true,
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
              <Grid item className={classes.singleForm}>
                <TextField
                  className={classes.formLabel}
                  InputLabelProps={{
                    shrink: true,
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
                <Grid item className={classes.singleForm}>
                  <TextField
                    className={classes.formLabel}
                    InputLabelProps={{
                      shrink: true,
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

                <Grid item container spacing={1} direction='row' className={classes.singleForm}>
                  {about.tags.map((t) => (
                    <PaddedFormGrid item key={t.id}>
                      <Chip
                        label={t.label}
                        color='primary'
                        variant='outlined'
                        onDelete={() => handleRemoveTag(t.id)}
                      />
                    </PaddedFormGrid>
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
        <Paper className={listMenu}>
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
        <Paper className={fixedHeightPaper}>
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
