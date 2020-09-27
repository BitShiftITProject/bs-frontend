import React, { useContext } from 'react'

import { IconButton } from '@material-ui/core'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import { ThemesContext } from '../Contexts/ThemesContext'


export default function DarkAndLightModeButton() {
    const { currentTheme: theme, setTheme } = useContext(ThemesContext)

    const toggleTheme = () => {
        theme === 'dark' ? setTheme('light') : setTheme('dark')
    }

    const themeIcon = theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />

    return (
        <div>
            <IconButton onClick={toggleTheme} color='inherit'>
                {themeIcon}
            </IconButton>
        </div>
    )
}
