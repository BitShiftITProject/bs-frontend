import React from 'react'
import { Typography, Breadcrumbs } from '@material-ui/core'
import { loggedInStyles } from '../loggedInStyles'
import { useLocation, Link } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
import DescriptionIcon from '@material-ui/icons/Description'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import SettingsIcon from '@material-ui/icons/Settings'

// For mapping a path segment (the singular segment between /'s)
// to a corresponding breadcrumb NAME (all segments must have a corresponding crumb)
// TODO: Handle mutable breadcrumbs such as portfolio titles
const breadcrumbNameMap = {
  home: 'Home',
  profile: 'Profile',
  portfolios: 'Portfolios',
  help: 'Help',
  settings: 'Settings',
}

// For mapping a path segment (the singular segment between /'s) to a
// corresponding breadcrumb ICON (if needed)
const breadcrumbIconMap = {
  home: <HomeIcon />,
  profile: <PersonIcon />,
  portfolios: <DescriptionIcon />,
  help: <HelpOutlineIcon />,
  settings: <SettingsIcon />,
}

export default function HeaderBreadcrumbs(props) {
  // Contains all styling
  const classes = loggedInStyles()

  // React Router hook used to get pathname from the Location routeProp
  const { pathname } = useLocation()

  // Non-empty string path segments (i.e. a single breadcrumb)
  const pathSegments = pathname.split('/').filter((elem) => elem)
  const pathLength = pathSegments.length

  // Getting the path of a Link breadcrumb, e.g. for a single breadcrumb Profile in
  // the following breadcrumbs Home > Portfolio > Add Portfolio, the pathname is
  // /home/portfolio
  // Assumes that all path segments have a corresponding breadcrumb name
  const getPathname = (idx) => {
    let pathname = ''
    let i = 0

    while (i <= idx) {
      pathname = pathname.concat(`/${pathSegments[i]}`)
      i++
    }

    return pathname
  }

  return (
    <div>
      <Breadcrumbs className={classes.breadcrumbs} aria-label='breadcrumb'>
        {/**
         * Maps each path segment to a Typography component if it is the last path segment,
         * and a router Link otherwise.
         */}
        {pathSegments.map((segment, idx) =>
          idx !== pathLength - 1 ? (
            <Link className={classes.breadcrumbLink} to={getPathname(idx)} key={segment}>
              <span className={breadcrumbIconMap[segment] ? classes.breadcrumbIcon : ''}>
                {breadcrumbIconMap[segment]}
              </span>
              {breadcrumbNameMap[segment]}
            </Link>
          ) : (
            <Typography
              style={{ fontWeight: 'bold' }}
              className={classes.breadcrumbLink}
              key={segment}
            >
              <span className={breadcrumbIconMap[segment] ? classes.breadcrumbIcon : ''}>
                {breadcrumbIconMap[segment]}
              </span>
              {breadcrumbNameMap[segment]}
            </Typography>
          )
        )}
      </Breadcrumbs>
    </div>
  )
}
