import React, { useContext, useState } from 'react'
import { LocaleContext } from '../Contexts/LocaleContext'
import languages from '../../lang/languages'
import { SpeedDial, SpeedDialAction } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  speedDial: {
    zIndex: theme.zIndex.speedDial,
    overflow: 'visible',
    height: 40
  },
  fab: {
    background: 'none',
    border: 'none',
    boxShadow: 'none'
  },
  speedDialAction: {
    color: 'inherit'
  }
}))

function LanguageButton() {
  const { currentLocale: locale, setLocale } = useContext(LocaleContext)

  function handleLocaleChange(value) {
    setLocale(value)
    setOpen(false)
    // console.log(value)
  }

  const currentLanguageIcon = (
    <span role='img' aria-label='current language'>
      {locale ? languages[locale].emoji : <span></span>}
    </span>
  )

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const classes = useStyles()

  return (
    <div className={classes.speedDial}>
      <SpeedDial
        ariaLabel='language select'
        icon={currentLanguageIcon}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction='down'
        FabProps={{ size: 'small', className: classes.fab }}
      >
        {Object.keys(languages).map((lang) => (
          <SpeedDialAction
            classes={{
              fab: classes.speedDialAction
            }}
            key={lang}
            icon={languages[lang].emoji}
            tooltipTitle={languages[lang].name}
            onClick={(e) => handleLocaleChange(lang)}
          />
        ))}
      </SpeedDial>
    </div>
  )
}

export default LanguageButton
