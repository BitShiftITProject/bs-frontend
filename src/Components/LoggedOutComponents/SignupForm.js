import React, { useCallback } from 'react'
import shallow from 'zustand/shallow'
import { useIntl } from 'react-intl'

import { CursorTypography } from '../../Styles/loggedInStyles'
import { loggedOutStyles } from '../../Styles/loggedOutStyles'
import { signupCheck } from '../../Backend/Fetch'
import SignupLoginData from './SignupLoginData'
import { useFormStore } from '../../Hooks/Store'

function SignupForm() {
  /* -------------------------------------------------------------------------- */
  /*                                   Styling                                  */
  /* -------------------------------------------------------------------------- */

  const style = loggedOutStyles()

  /* -------------------------------------------------------------------------- */
  /*                                   Locale                                   */
  /* -------------------------------------------------------------------------- */

  const intl = useIntl()

  /* -------------------------------------------------------------------------- */
  /*                          States and their Setters                          */
  /* -------------------------------------------------------------------------- */

  const [
    username,
    email,
    password,
    firstName,
    lastName,
    loading,
    showPassword,
    modifyForm
  ] = useFormStore(
    useCallback(
      ({ username, email, password, firstName, lastName, loading, showPassword, modifyForm }) => [
        username,
        email,
        password,
        firstName,
        lastName,
        loading,
        showPassword,
        modifyForm
      ],
      []
    ),
    shallow
  )

  const handleClickShowPassword = () => modifyForm('showPassword', !showPassword)
  const changeLoading = () => modifyForm('loading', !loading)

  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  // Handles changes in text input
  function handleChange(e) {
    modifyForm(e.target.name, e.target.value)
  }

  // POST request to backend signup endpoint, sending the current state data to
  // create a user
  async function handleSubmit(e) {
    e.preventDefault()

    // Reset error state to hide the error alert
    modifyForm('signUpFailed', false)
    modifyForm('errorMessage', '')

    // Call the user creation endpoint using the details in the text fields
    // The keys must be exact with the endpoint
    const details = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      username: username,
      password: password
    }

    changeLoading()

    const response = await signupCheck(details)

    // If user signup was successful, redirect to '/login'
    if (response && response.ok) {
      modifyForm('completed', true)

      // Otherwise get the error message from the response and show the message in
      // the error alert
    } else {
      const error = await response.json()
      modifyForm('signUpFailed', true)
      modifyForm('errorMessage', error.error.message)
    }
    changeLoading()
  }

  /* -------------------------------------------------------------------------- */
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */

  const form = (
    <SignupLoginData
      handleChange={handleChange}
      handleClickShowPassword={handleClickShowPassword}
    />
  )

  const content = (
    <div className={style.signupDiv}>
      <form onSubmit={handleSubmit} className={style.signupForm}>
        {/*
         * HEADING
         */}
        <CursorTypography component='h1' variant='h5'>
          {intl.formatMessage({ id: 'signUp' })}
        </CursorTypography>
        {/* FORM */}
        {form}
      </form>
    </div>
  )

  return content
}
export default React.memo(SignupForm)
