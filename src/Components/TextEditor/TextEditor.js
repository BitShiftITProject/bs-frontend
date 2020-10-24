import React, { useContext } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { PortfolioContext } from '../Contexts/PortfolioContext'

export default function TextEditor({ sectionIndex, elementIndex, name, data }) {
  const { modifySection } = useContext(PortfolioContext)

  function handleEditorChange(content, editor) {
    modifySection(sectionIndex, elementIndex, name, content)
  }

  return (
    <Editor
      // public and free API key
      apiKey='kz1kzb3i7lq7l47z5uyabflz18exurcg3yg25zitynhdw6g9'
      initialValue={data}
      init={{
        height: 300,
        // width: 600,
        plugins:
          'paste searchreplace autolink directionality link codesample table charmap hr insertdatetime advlist lists wordcount textpattern noneditable help emoticons',
        // menubar: 'edit insert format table help',
        menubar: false,
        toolbar:
          'undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | forecolor backcolor | outdent indent |  numlist bullist | fontsizeselect formatselect | link codesample charmap emoticons ',
        toolbar_sticky: true,
        noneditable_noneditable_class: 'mceNonEditable',
        toolbar_mode: 'sliding',
        contextmenu: 'link table'
      }}
      onEditorChange={handleEditorChange}
    />
  )
}
