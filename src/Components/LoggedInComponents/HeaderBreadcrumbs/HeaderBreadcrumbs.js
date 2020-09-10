import React from 'react'
import { Typography, Breadcrumbs } from '@material-ui/core'
import { useStyles } from '../../useStyles'
import { useLocation, useHistory, Link } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'

const breadcrumbNameMap = {
  home: 'Home',
  profile: 'Profile',
}

const breadcrumbIconMap = {
  home: <HomeIcon />,
}

export default function HeaderBreadcrumbs(props) {
  const classes = useStyles()
  const { pathname } = useLocation()
  const history = useHistory()

  const crumbs = pathname.split('/').filter((elem) => elem)
  const pathLength = crumbs.length

  const getPathname = (idx) => {
    let pathname = ''
    let i = 0

    while (i <= idx) {
      pathname = pathname.concat(`/${crumbs[i]}`)
      i++
    }

    return pathname
  }

  const handleClick = (e) => {
    history.push(e.target.to)
  }

  return (
    <div>
      <Breadcrumbs className={classes.breadcrumbs} aria-label='breadcrumb'>
        {crumbs.map((c, idx) =>
          idx !== pathLength - 1 ? (
            <Link
              className={classes.breadcrumbLink}
              to={getPathname(idx)}
              onClick={handleClick}
              key={c}
            >
              <span className={breadcrumbIconMap[c] ? classes.breadcrumbIcon : ''}>
                {breadcrumbIconMap[c]}
              </span>
              {breadcrumbNameMap[c]}
            </Link>
          ) : (
            <Typography className={classes.breadcrumbLink} key={c}>
              <span className={breadcrumbIconMap[c] ? classes.breadcrumbIcon : ''}>
                {breadcrumbIconMap[c]}
              </span>
              {breadcrumbNameMap[c]}
            </Typography>
          )
        )}
      </Breadcrumbs>
      <div className={classes.breadcrumbSpacer}></div>
    </div>
  )
}
