import React from 'react'
import { loggedInStyles} from '../../../Styles/loggedInStyles'

import {
    Grid,
    Paper,
    Fab
  } from '@material-ui/core'
  import { useIntl } from 'react-intl'
  
export default function UserProfileDataForm({handleSubmit, form}) {
    const intl = useIntl()
    // Used for general styles
    const classes = loggedInStyles()

     return (
      /**
       * FORM with user profile data
       */
       <Grid item xs={12} md={9} lg={10} container direction='column' justify='space-between'>
       <Paper className={classes.fixedHeightPaper}>
         <Grid item style={{ overflow: 'scroll' }}>
           {form}
         </Grid>
         <Grid item className={classes.floatingBottomContainer}>
           <Fab
             variant='extended'
             aria-label={intl.formatMessage({ id: 'saveChanges' })}
             onClick={handleSubmit}
             color='secondary'
           >
             {intl.formatMessage({ id: 'saveChanges' })}
           </Fab>
         </Grid>
       </Paper>
     </Grid>
     )
}