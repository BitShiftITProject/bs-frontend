import React from 'react'
import { loggedInStyles } from '../../../Styles/loggedInStyles'

import { Grid, Paper, Fab, CircularProgress } from '@material-ui/core'
import { useIntl } from 'react-intl'

function UserProfileDataForm({ handleSubmit, form, loading }) {
  const intl = useIntl()
  // Used for general styles
  const classes = loggedInStyles()

  return (
    /**
     * FORM with user profile data
     */
    <Grid item xs={12} md={9} lg={10} container direction='column' justify='space-between'>
      <Paper className={classes.fixedHeightPaper}>
        <Grid item style={{ overflowX: 'hidden', overflowY: 'scroll' }}>
          {form}
        </Grid>
        <span style={{ width: 'max-content' }} className={classes.fabProgressContainer}>
          <Fab
            disabled={loading}
            variant='extended'
            aria-label={intl.formatMessage({ id: 'saveChanges' })}
            onClick={handleSubmit}
            color='secondary'
          >
            {intl.formatMessage({ id: 'saveChanges' })}
          </Fab>
          {loading && <CircularProgress size={24} className={classes.fabProgress} />}
        </span>
      </Paper>
    </Grid>
  )
}

export default React.memo(UserProfileDataForm)
