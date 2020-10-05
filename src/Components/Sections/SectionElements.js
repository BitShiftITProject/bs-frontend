import React from 'react'

import { Grid, TextField, Typography, styled } from '@material-ui/core'

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius amet error pariatur atque modi necessitatibus numquam. Adipisci quidem ad animi id libero amet itaque numquam, nostrum recusandae dolor quo pariatur possimus quos odit neque perferendis optio repudiandae repellat molestias dolorum sint eligendi atque placeat. Vero eius placeat incidunt sit adipisci?'

const title = 'Title'
const subtitle = 'Subtitle'
// const quote = '"Lorem ipsum dolor sit amet, consectetur adipisicing elit." -Lorem Ipsum'

const ExampleSection = styled(Grid)({
  overflow: 'hidden',
  height: 40,
  border: '0.5px solid rgba(0,0,0,0.05)',
  backgroundColor: '#F1F1F1',
  color: '#000',
  cursor: 'default',
  '& p': {
    lineHeight: 'auto'
  },
  justifyContent: 'center',
  alignItems: 'center'
})

/* -------------------------------------------------------------------------- */
/*                              Section Elements                              */
/* -------------------------------------------------------------------------- */

// A section element is a single element within a section. For example, a
// section may be comprised of a Paragraph section element and a Title section
// element.

// Section elements are rendered in the MapSection function in SectionsMap.js,
// which maps section IDs to the corresponding components that makes up that
// section.

// For example, a section with the section ID 'headingTitle'  is mapped to
// a single Title section element:
//
// - If it was rendered in the non-editing mode (i.e. in a public portfolio),
//   it is shown as a Typography component with the section's content.
//
// - If it was rendered in the editing mode, it may either be shown as:
//   - An actual section with the actual contents from the Page object
//     such that the 'content' attribute is non-null
//   - A section template, wrapped in the ExampleSection, where the 'content'
//     attribute is null

export const Paragraph = ({ editing, content }) => {
  const rendered = editing ? (
    !content ? (
      <ExampleSection container>
        <Typography variant='caption' component='p'>
          {lorem}
        </Typography>
      </ExampleSection>
    ) : (
      <TextField value={content} />
    )
  ) : (
    <Typography>{content}</Typography>
  )

  return rendered
}

export const Title = ({ editing, content }) => {
  const rendered = editing ? (
    !content ? (
      <ExampleSection container>
        <Typography variant='h5'>{title}</Typography>
      </ExampleSection>
    ) : (
      <TextField value={content} />
    )
  ) : (
    <Typography component='h1' variant='h5'>
      {content}
    </Typography>
  )

  return rendered
}

export const Subtitle = ({ editing, content }) => {
  const rendered = editing ? (
    !content ? (
      <ExampleSection container>
        <Typography variant='h6'>{subtitle}</Typography>
      </ExampleSection>
    ) : (
      <TextField value={content} />
    )
  ) : (
    <Typography component='h1' variant='h5'>
      {content}
    </Typography>
  )

  return rendered
}
