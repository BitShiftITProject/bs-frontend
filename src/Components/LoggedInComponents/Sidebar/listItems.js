import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
// import ListSubheader from '@material-ui/core/ListSubheader'
// import AssignmentIcon from '@material-ui/icons/Assignment'

import HomeIcon from '@material-ui/icons/Home'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import SettingsIcon from '@material-ui/icons/Settings'
import DescriptionIcon from '@material-ui/icons/Description'
export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary='Home' />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <DescriptionIcon />
      </ListItemIcon>
      <ListItemText primary='Portfolios' />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <HelpOutlineIcon />
      </ListItemIcon>
      <ListItemText primary='Help' />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary='Settings' />
    </ListItem>
  </div>
)

// export const secondaryListItems = (
//   <div>
//     <ListSubheader inset>Portfolios</ListSubheader>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary='IT Resume' />
//     </ListItem>

//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary='Art Resume' />
//     </ListItem>

//   </div>
// )
