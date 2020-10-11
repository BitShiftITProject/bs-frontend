import React, { useState, useReducer, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import Sidebar from '../Sidebar'
import ContactInfoDetails from "./ContactInfoDetails"
import AboutMeDetails from "./AboutMeDetails"
import EditProfileListMenu from "./EditProfileListMenu"
import UserProfileDataForm from "./UserProfileDataForm"
import { Grid } from '@material-ui/core'
import { getUser, logout, patchUser } from '../UserProfileDataForm'
import { useHistory } from 'react-router-dom'

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

// TODO: Refactor the ever-living soul out of this component
export default function EditProfilePage() {
  /* -------------------------------------------------------------------------- */
  /*                          States and their Setters                          */
  /* -------------------------------------------------------------------------- */

  const [page, setPage] = useState('aboutMe')
  const [tagText, setTagText] = useState('')
  const [about, setAbout] = useReducer(reducer, initialAbout)
  const [contact, setContact] = useReducer(reducer, initialContact)

  /* -------------------------------------------------------------------------- */
  /*                         Fetching Initial User Data                         */
  /* -------------------------------------------------------------------------- */

  const history = useHistory()

  useEffect(() => {
    async function grabUser() {
      const user = await getUser()
      if (!user) {
        return null
      }
      return user
    }

    grabUser().then((user) => {
      if (!user) {
        logout()
      } else {
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
      }
    })
  }, [history])

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
      // Gets the content of the Tags text field
      const { value } = event.target

      // Adds the tag to the current list of tags
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
    const patchDetails = { ...about, ...contact }
    patchUser(patchDetails)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  /* -------------------------------------------------------------------------- */
  /*                             Form to be Rendered                            */
  /* -------------------------------------------------------------------------- */

  // Switch between About Me and Contact options according to the 'page' state:
  // - renders About Me form if page === 'aboutMe'
  // - renders Contact form if page === 'contact'

  let form

  switch (page) {
    // Contact Form
    case 'contact':
      form = <ContactInfoDetails 
              handleOnContactChange={handleOnContactChange} 
              contact={contact}
            />
      break
    // About Me form
    default:
      form = <AboutMeDetails 
              handleOnAboutChange={handleOnAboutChange} 
              handleAddTag={handleAddTag} 
              handleRemoveTag={handleRemoveTag} 
              about={about} 
              tagText={tagText} 
              setTagText={setTagText}
            />
  }
  /* -------------------------------------------------------------------------- */
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */
  // Contains the form to be rendered
  const content = (
    <Grid container direction='row' spacing={0}>
      {/* TO DO: double check if this works. without PAGE={PAGE} it still renders and compiles?
      what is the purpose of page===contact*/}
      <EditProfileListMenu setPage={setPage} page={page}/>
  
      {/* FORM with user profile data*/}
       <UserProfileDataForm handleSubmit={handleSubmit} form={form}/>
    </Grid>
  )
  return <Sidebar content={content} />
}