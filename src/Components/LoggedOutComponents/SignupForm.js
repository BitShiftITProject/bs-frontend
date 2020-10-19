import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import { CursorTypography } from '../../Styles/loggedInStyles'
import { loggedOutStyles } from '../../Styles/loggedOutStyles'
import { signupCheck } from '../../Backend/Fetch'
import SignupLoginData from './SignupLoginData'

function SignupForm({ setCompleted, setEmail }) {
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

  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    birthdate: '',
    gender: 'other',
    firstName: '',
    lastName: '',
    signUpFailed: false,
    errorMessage: intl.formatMessage({ id: 'loginError' }),
    loading: false
  })

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)

  function changeLoading() {
    setState((st) => ({
      ...st,
      loading: !st.loading
    }))
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  // Handles changes in text input
  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  // POST request to backend signup endpoint, sending the current state data to
  // create a user
  async function handleSubmit(e) {
    e.preventDefault()

    // Reset error state to hide the error alert
    setState((st) => ({
      ...st,
      signUpFailed: false,
      errorMessage: ''
    }))

    // Password field must be same as Confirm Password field, otherwise toggle error
    if (state.password !== state.confirm) {
      setState((st) => ({
        ...st,
        signUpFailed: true,
        errorMessage: intl.formatMessage({ id: 'passwordError' })
      }))
      return
    }

    // Call the user creation endpoint using the details in the text fields
    // The keys must be exact with the endpoint
    const details = {
      first_name: state.firstName,
      last_name: state.lastName,
      email: state.email,
      username: state.username,
      password: state.password
    }

    changeLoading()

    const response = await signupCheck(details)

    // If user signup was successful, redirect to '/login'
    if (response && response.ok) {
      setEmail(state.email)
      setCompleted(true)

      // Otherwise get the error message from the response and show the message in
      // the error alert
    } else {
      const error = await response.json()
      setState((st) => ({
        ...st,
        signUpFailed: true,
        errorMessage: error.error.message
      }))
    }
    changeLoading()

    // setEmail(state.email)
    // setCompleted(true)
  }

  /* -------------------------------------------------------------------------- */
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */

  const form = (
    <SignupLoginData
      state={state}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      showPassword={showPassword}
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
export default SignupForm
