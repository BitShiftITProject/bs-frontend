import React, { useState, useReducer } from 'react'
import { v4 as uuid } from 'uuid'
import clsx from 'clsx'
import { useStyles } from '../../useStyles'
import Sidebar from '../Sidebar'
import {
  Container,
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
import HeaderBreadcrumbs from '../HeaderBreadcrumbs'
import PersonIcon from '@material-ui/icons/Person'
import PhoneIcon from '@material-ui/icons/Phone'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

const initialAbout = {
  firstName: '',
  lastName: '',
  occupation: '',
  description: '',
  tagText: '',
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
  accounts: [],
}

const reducer = (state, newState) => ({ ...state, ...newState })

export default function EditProfilePage() {
  const [page, setPage] = useState('aboutMe')
  const [about, setAbout] = useReducer(reducer, initialAbout)
  const [contact, setContact] = useReducer(reducer, initialContact)

  const handleOnAboutChange = (event) => {
    const { name, value } = event.target
    console.log(name, value)
    setAbout({ [name]: value })
  }

  const handleAddTag = (event) => {
    if (event.key === 'Enter') {
      const { value } = event.target

      const newTags = about.tags.length
        ? [...about.tags, { id: uuid(), label: value }]
        : [{ id: uuid(), label: value }]

      setAbout({ tags: newTags, tagText: '' })
    }
  }

  const handleRemoveTag = (id) => {
    const newTags = about.tags.filter((t) => t.id != id)
    setAbout({ ...about, tags: newTags })
  }

  const handleOnContactChange = (event) => {
    const { name, value } = event.target
    setContact({ [name]: value })
  }

  const handleAddAccount = (event) => {
    const newAccounts = contact.accounts.length
      ? [...contact.accounts, { id: uuid(), website: '', username: '' }]
      : [{ id: uuid(), website: '', username: '' }]

    setContact({ accounts: newAccounts })
  }

  const handleRemoveAccount = (id) => {
    const newAccounts = contact.accounts.filter((l) => l.id != id)
    setContact({ ...contact, accounts: newAccounts })
  }

  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  const listMenu = clsx(fixedHeightPaper, classes.listMenu)

  let details

  switch (page) {
    case 'contact':
      details = (
        <form className={classes.profileForm} noValidate autoComplete='off'>
          <Grid container spacing={2} direction='column'>
            <Grid item container spacing={0} direction='column'>
              <Grid item>
                <Chip label='Details' color='primary' />
              </Grid>
              <Grid item container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label='Email'
                    variant='outlined'
                    name='email'
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

            <Grid item container spacing={2} direction='column'>
              <Grid item>
                <Chip label='Accounts' color='primary' />
              </Grid>
              <List component='nav' aria-label='profile accounts'>
                {contact.accounts.map((l) => (
                  <ListItem key={l.id} className={classes.accountListItem}>
                    <Fab
                      className={classes.removeAccountButton}
                      size='small'
                      aria-label='remove account'
                      onClick={() => handleRemoveAccount(l.id)}
                    >
                      <CloseIcon />
                    </Fab>
                    <Grid item container spacing={2} direction='row'>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          placeholder='Website'
                          variant='outlined'
                          name='website'
                          value={contact.website}
                          onChange={handleOnContactChange}
                        />
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <TextField
                          fullWidth
                          placeholder='Username'
                          variant='outlined'
                          name='username'
                          value={contact.username}
                          onChange={handleOnContactChange}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
              <Grid item>
                <Fab size='small' color='primary' aria-label='add' onClick={handleAddAccount}>
                  <AddIcon />
                </Fab>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </Grid>
        </form>
      )
      break
    default:
      details = (
        <form className={classes.profileForm} noValidate autoComplete='off'>
          <Grid container spacing={2} direction='column'>
            <Grid item container spacing={0} direction='column'>
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
              <Grid item>
                <TextField
                  placeholder='Type and enter to add a tag...'
                  fullWidth
                  variant='outlined'
                  name='tagText'
                  value={about.tagText}
                  onChange={handleOnAboutChange}
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
          </Grid>
        </form>
      )
  }

  const content = (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth='lg' className={classes.container}>
        <HeaderBreadcrumbs />
        <div className={classes.breadcrumbSpacer} />

        <Grid container direction='row' spacing={0}>
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
          <Grid item xs={12} md={9} lg={10}>
            <Paper className={fixedHeightPaper}>{details}</Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  )
  return <Sidebar content={content} />
}
