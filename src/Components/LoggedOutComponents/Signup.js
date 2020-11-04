import React, { useCallback } from 'react'

import LandingContainer from './LandingContainer'
import SignupForm from './SignupForm'
import SignupVerifyEmail from './SignupVerifyEmail'
import { useFormStore } from '../../Hooks/Store'
import { loggedOutStyles } from '../../Styles/loggedOutStyles'

function Signup() {
  const completed = useFormStore(useCallback((state) => state.completed, []))

  const style = loggedOutStyles()

  const content = !completed ? <SignupForm /> : <SignupVerifyEmail />

  return (
    <LandingContainer
      content={
        <div className={style.centerContainer}>
          <div className={style.paper}>{content}</div>
        </div>
      }
    />
  )
}

export default Signup
