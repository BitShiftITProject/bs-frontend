import React, { useState, useReducer } from 'react'
import { v4 as uuid } from 'uuid'
import clsx from 'clsx'

import Sidebar from './Sidebar'

import { loggedInStyles } from '../loggedInStyles'

import {
  Grid,
  Paper,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  TextField,
  Chip,
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
  /* --------------------------- States and Handlers -------------------------- */

  const [page, setPage] = useState('aboutMe')
  const [tagText, setTagText] = useState('')
  const [about, setAbout] = useReducer(reducer, initialAbout)
  const [contact, setContact] = useReducer(reducer, initialContact)

  // Handles changes in any text input in the About Me form, reflects this
  // change in the 'about' state object
  const handleOnAboutChange = (event) => {
    const { name, value } = event.target
    console.log(name, value)
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

  /* --------------------------------- Styles --------------------------------- */

  // Used for general styles
  const classes = loggedInStyles()

  // Used for all Paper components to give consistent height and spacing
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  // Used for the list menu containing the About Me and Contact options
  const listMenu = clsx(fixedHeightPaper, classes.listMenu)

  /* --------------------------- Form to be Rendered -------------------------- */

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
            <Grid item container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Email'
                  variant='outlined'
                  name='email'
                  helperText='Changing this will not change your login email address'
                  value={contact.email}
                  onChange={handleOnContactChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Contact Number'
                  variant='outlined'
                  name='number'
                  value={contact.number}
                  onChange={handleOnContactChange}
                />
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label='Address Line 1'
                  variant='outlined'
                  name='address1'
                  value={contact.address1}
                  onChange={handleOnContactChange}
                />
              </Grid>
              <Grid item container spacing={0} xs={12} md={6}>
                <Grid item xs={9}>
                  <TextField
                    fullWidth
                    label='Town / Suburb'
                    variant='outlined'
                    name='town'
                    value={contact.town}
                    onChange={handleOnContactChange}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label='State'
                    variant='outlined'
                    name='state'
                    value={contact.state}
                    onChange={handleOnContactChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
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
                  fullWidth
                  label='Country'
                  variant='outlined'
                  name='country'
                  value={contact.country}
                  onChange={handleOnContactChange}
                />
              </Grid>
            </Grid>
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
            <Grid item container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
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
                  fullWidth
                  label='Last Name'
                  variant='outlined'
                  name='lastName'
                  value={about.lastName}
                  onChange={handleOnAboutChange}
                />
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                label='Occupation'
                variant='outlined'
                fullWidth
                name='occupation'
                value={about.occupation}
                onChange={handleOnAboutChange}
              />
            </Grid>
          </Grid>
          {/**
           * ABOUT ME DESCRIPTION
           */}
          <Grid item container spacing={0} direction='column'>
            <Grid item>
              <Chip label='Description' color='primary' />
            </Grid>
            <Grid item>
              <TextField
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
          </Grid>
          <Grid item container spacing={0} direction='column'>
            <Grid item>
              <Chip label='Tags' color='primary' />
            </Grid>
            {/**
             * ABOUT ME TAGS
             */}
            <Grid item>
              <TextField
                placeholder='Type and enter to add a tag...'
                fullWidth
                variant='outlined'
                name='tagText'
                value={tagText}
                onChange={(e) => setTagText(e.target.value)}
                onKeyDown={handleAddTag}
              />

              <Grid item container spacing={1} direction='row'>
                {about.tags.map((t) => (
                  <Grid item key={t.id}>
                    <Chip
                      label={t.label}
                      color='primary'
                      variant='outlined'
                      onDelete={() => handleRemoveTag(t.id)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </form>
      )
  }

  const content = (
    <Grid container direction='row' spacing={0}>
      {/**
       * LIST MENU with About Me, Contact options
       */}
      <Grid item xs={12} md={3} lg={2}>
        <Paper className={listMenu}>
          <List component='nav' aria-label='profile sections'>
            <ListItem button onClick={() => setPage('aboutMe')}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary='About Me' />
            </ListItem>
            <ListItem button onClick={() => setPage('contact')}>
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
      <Grid item xs={12} md={9} lg={10}>
        <Paper className={fixedHeightPaper}>{form}</Paper>
      </Grid>
    </Grid>
  )

  return <Sidebar content={content} />
}
