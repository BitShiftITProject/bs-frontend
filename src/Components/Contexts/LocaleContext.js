import React, { createContext, Fragment, useState } from 'react'
import { IntlProvider } from 'react-intl'
import translations from '../../lang/translations'

export const LocaleContext = createContext({ currentLocale: 'en-AU', setLocale: null })

const LocaleProvider = ({ children }) => {
  const currentLocale = localStorage.getItem('locale') || 'en-AU'

  const [localeName, setLocaleName] = useState(currentLocale)
  const [messages, setMessages] = useState(translations[currentLocale])

  const setLocale = (locale) => {
    localStorage.setItem('locale', locale)
    setLocaleName(locale)
    setMessages(translations[locale])
  }

  const contextValue = { currentLocale: localeName, setLocale }

  return (
    <LocaleContext.Provider value={contextValue}>
      <IntlProvider
        defaultLocale='en-AU'
        locale={localeName}
        textComponent={Fragment}
        messages={messages}
      >
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  )
}

export default LocaleProvider
