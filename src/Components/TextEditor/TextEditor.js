import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { useStore } from '../../Hooks/Store'

const editElementFunction = (state) => state.editCurrentElement

export default function TextEditor({ data }) {
  const editCurrentElement = useStore(editElementFunction)

  function handleEditorChange(content, editor) {
    editCurrentElement(content)
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
          'paste searchreplace autolink directionality link code table hr insertdatetime advlist lists wordcount textpattern noneditable help',
        // menubar: 'edit insert format table help',
        menubar: false,
        toolbar:
          'undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | forecolor backcolor | outdent indent |  numlist bullist | fontselect fontsizeselect formatselect ',
        toolbar_sticky: true,
        noneditable_noneditable_class: 'mceNonEditable',
        toolbar_mode: 'sliding',
        contextmenu: 'link table',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
      onEditorChange={handleEditorChange}
    />
  )
}
