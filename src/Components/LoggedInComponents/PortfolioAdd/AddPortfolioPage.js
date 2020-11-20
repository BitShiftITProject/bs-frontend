import React, { useCallback, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'

import {
  Grid,
  Paper,
  Button,
  FormHelperText,
  Fab,
  Stepper,
  Step,
  StepButton,
  CircularProgress
} from '@material-ui/core'

import { loggedInStyles } from '../../../Styles/loggedInStyles'
import Sidebar from '../Sidebar'

import { logout } from '../../../Backend/Fetch'

import { useIntl } from 'react-intl'
import useAddPortfolio from '../../../Hooks/useAddPortfolio'
import { useQueryCache } from 'react-query'
import { useFormStore } from '../../../Hooks/Store'
import shallow from 'zustand/shallow'
import PortfolioDetailsForm from './PortfolioDetailsForm'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import PortfolioThemeForm from './PortfolioThemeForm'
import PortfolioTemplateForm from './PortfolioTemplateForm'
import { templates } from '../../Templates/templates'
import useAddPage from '../../../Hooks/useAddPage'

const portfolioFormSelector = ({
  title,
  description,
  theme,
  template,
  error,
  errorMessage,
  modifyForm,
  resetPortfolioForm,
  loading
}) => [
  title,
  description,
  theme,
  template,
  error,
  errorMessage,
  modifyForm,
  resetPortfolioForm,
  loading
]

const steps = ['Details', 'Theme', 'Template']
const stepsLength = steps.length

export default function AddPortfolioPage() {
  /* -------------------------------------------------------------------------- */
  /*                                   Locale                                   */
  /* -------------------------------------------------------------------------- */

  const intl = useIntl()

  /* -------------------------------------------------------------------------- */
  /*                          States and their Setters                          */
  /* -------------------------------------------------------------------------- */

  const [activeStep, setActiveStep] = useState(0)
  const [
    title,
    description,
    theme,
    template,
    error,
    errorMessage,
    modifyForm,
    resetPortfolioForm,
    loading
  ] = useFormStore(useCallback(portfolioFormSelector, []), shallow)
  const { enqueueSnackbar } = useSnackbar()

  /* -------------------------------------------------------------------------- */
  /*                                   Styling                                  */
  /* -------------------------------------------------------------------------- */

  const classes = loggedInStyles()
  const fixedHeightPaper = classes.fixedHeightPaper

  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  const user = useQueryCache().getQueryData('user')
  const [addPortfolio] = useAddPortfolio()
  const [addPage] = useAddPage()

  useEffect(() => {
    return () => {
      resetPortfolioForm()
    }
  }, [resetPortfolioForm])

  async function handleSubmit(e) {
    e.preventDefault()

    // Reset error state to false to not show the helper text right after
    // clicking Add Portfolio button
    modifyForm('error', false)
    modifyForm('errorMessage', '')

    // Logs out if access token is no longer valid
    if (!user) {
      logout()
      return
    }

    if (!title) {
      modifyForm('errorMessage', 'Title is required.')
      modifyForm('error', true)
      return
    }

    // Format the to-be-stringified details that will be
    // passed into the portfolio creation endpoint
    const postDetails = {
      title,
      description,
      pageOrder: [],
      theme
    }

    modifyForm('loading', true)

    // console.log(postDetails, template)

    // Creates a portfolio belonging to the currently logged-in user,
    // if error, show an error helper text.

    try {
      addPortfolio({ username: user.username, postDetails })
        .then((response) => response.json())
        .then(async (data) => {
          const portfolioId = data.id

          for (let page of templates[template]) {
            // console.log(page)
            await addPage({ portfolioId, postDetails: page })
          }

          enqueueSnackbar(intl.formatMessage({ id: 'addedPortfolio' }, { portfolioTitle: title }), {
            variant: 'success'
          })

          setTimeout(() => {
            window.location.href = '/portfolios'
          }, 1000)
        })
    } catch (error) {
      modifyForm('error', true)
      modifyForm('loading', false)
      modifyForm('errorMessage', 'An error occurred. Try again.')
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Stepper                                  */
  /* -------------------------------------------------------------------------- */

  function handleStep(step) {
    setActiveStep(step)
  }

  function handleBack() {
    setActiveStep(activeStep - 1)
  }

  function handleNext() {
    if (activeStep === 0) {
      if (!title) {
        modifyForm('error', true)
        modifyForm('errorMessage', 'Title is required.')
        return
      } else {
        modifyForm('error', false)
        modifyForm('errorMessage', '')
      }
    }
    setActiveStep(activeStep + 1)
  }

  /* -------------------------------------------------------------------------- */
  /*                                Page Content                                */
  /* -------------------------------------------------------------------------- */

  const content = (
    <Grid container direction='row' spacing={0}>
      <Grid item xs={12} container direction='column' justify='center' alignItems='center'>
        <Paper className={fixedHeightPaper}>
          <div>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, idx) => (
                <Step key={label}>
                  <StepButton onClick={() => handleStep(idx)}>{label}</StepButton>
                </Step>
              ))}
            </Stepper>
          </div>
          <Grid item container justify='center' alignItems='center' style={{ height: '100%' }}>
            {/*
             * FORM GRID
             */}
            <form onSubmit={handleSubmit} style={{ width: '100%', height: '90%' }}>
              <Grid
                container
                justify='center'
                alignItems='center'
                direction='column'
                style={{ height: '100%' }}
              >
                {activeStep === 0 && <PortfolioDetailsForm />}
                {activeStep === 1 && <PortfolioThemeForm />}
                {activeStep === 2 && <PortfolioTemplateForm />}
                <FormHelperText style={{ margin: 16 }} error={error}>
                  {errorMessage}
                </FormHelperText>
                <Grid
                  item
                  container
                  spacing={2}
                  justify='center'
                  alignItems='center'
                  direction='row'
                >
                  {activeStep !== 0 && (
                    <Grid item>
                      <Fab variant='extended' size='medium' onClick={handleBack}>
                        <ArrowBackIosIcon />
                        Back
                      </Fab>
                    </Grid>
                  )}
                  {activeStep < stepsLength - 1 && (
                    <Grid item>
                      <Fab variant='extended' color='secondary' size='medium' onClick={handleNext}>
                        Next
                        <ArrowForwardIosIcon />
                      </Fab>
                    </Grid>
                  )}
                  {activeStep === stepsLength - 1 && (
                    <Grid item className={classes.fabProgressContainer}>
                      <Button
                        type='submit'
                        variant='contained'
                        color='secondary'
                        onClick={handleSubmit}
                        disabled={loading}
                      >
                        {intl.formatMessage({ id: 'addPortfolio' })}
                      </Button>
                      {loading && <CircularProgress size={24} className={classes.fabProgress} />}
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )

  return <Sidebar content={content} />
}
