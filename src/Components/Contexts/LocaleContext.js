import React, { createContext, Fragment, useState } from 'react'
import { IntlProvider } from 'react-intl'
import translations from '../../lang/translations'

export const LocaleContext = createContext({ currentLocale: 'en-AU', setLocale: null })

const LocaleProvider = ({ children }) => {
  // Read locale from local storage, with English (Australia) being the default locale
  const currentLocale = localStorage.getItem('locale') || 'en-AU'

  // To hold the current locale and the locale's corresponding translated messages
  const [localeName, setLocaleName] = useState(currentLocale)
  const [messages, setMessages] = useState(translations[currentLocale])

  // Function to pass into the context value, so locale can be changed anywhere
  const setLocale = (locale) => {
    localStorage.setItem('locale', locale)
    setLocaleName(locale)
    setMessages(translations[locale])
  }

  // To be called upon by other components, if need to use/change the locale
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
