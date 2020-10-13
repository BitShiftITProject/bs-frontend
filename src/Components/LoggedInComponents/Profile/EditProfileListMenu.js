import React from 'react'
import { useIntl } from 'react-intl'
import {loggedInStyles} from '../../../Styles/loggedInStyles'
import PersonIcon from '@material-ui/icons/Person'
import PhoneIcon from '@material-ui/icons/Phone'
import {
    Grid,
    Paper,
    List,
    ListItemIcon,
    ListItemText,
    ListItem,
  } from '@material-ui/core'
  
export default function EditProfileListMenu({page, setPage}) {
    const intl = useIntl()
    // Used for general styles
    const classes = loggedInStyles()

     return (
        /**
       * LIST MENU with About Me, Contact options
       */
       <Grid item xs={12} md={3} lg={2}>
       <Paper className={classes.listMenu}>
         <List component='nav' aria-label='profile sections'>
           <ListItem button selected={page === 'aboutMe'} onClick={() => setPage('aboutMe')}>
             <ListItemIcon>
               <PersonIcon />
             </ListItemIcon>
             <ListItemText primary={intl.formatMessage({ id: 'aboutMe' })} />
           </ListItem>
           <ListItem button selected={page === 'contact'} onClick={() => setPage('contact')}>
             <ListItemIcon>
               <PhoneIcon />
             </ListItemIcon>
             <ListItemText primary={intl.formatMessage({ id: 'contact' })} />
           </ListItem>
         </List>
       </Paper>
     </Grid>
    )
}









