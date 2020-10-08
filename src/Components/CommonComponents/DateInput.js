import React from 'react'
import { useIntl } from 'react-intl'
import Cleave from 'cleave.js/react'

export default function DateInput({ inputRef, ...otherProps }) {
  const intl = useIntl()

  // DateInput will be put into the InputProps attribute of a Material-UI
  // TextField component
  /* -------------------------------------------------------------------------- */
  // Example (after importing DateInput):
  // <TextField
  //   InputProps={{
  //     inputComponent: DateInput
  //   }}
  // />

  return (
    <Cleave
      {...otherProps}
      placeholder={intl.formatMessage({ id: 'dateFormat' })}
      htmlRef={inputRef}
      options={{
        date: true,
        datePattern: ['d', 'm', 'Y']
      }}
    />
  )
}
