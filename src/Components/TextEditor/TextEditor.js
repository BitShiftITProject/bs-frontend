import React from 'react'
import { Editor } from '@tinymce/tinymce-react'

export default function TextEditor() {
  function handleEditorChange(content, editor) {
    // console.log('Content was updated:', content)
  }

  return (
    <Editor
      // public and free API key
      apiKey='kz1kzb3i7lq7l47z5uyabflz18exurcg3yg25zitynhdw6g9'
      initialValue='<p>This is the initial content of the editor</p>'
      init={{
        height: 600,
        width: 600,
        plugins:
          'paste searchreplace autolink directionality link codesample table charmap hr insertdatetime advlist lists wordcount textpattern noneditable help quickbars emoticons',
        menubar: 'edit insert format table help',
        toolbar:
          'undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | fontsizeselect formatselect | link codesample charmap emoticons ',
        toolbar_sticky: true,
        quickbars_insert_toolbar: false,
        quickbars_selection_toolbar:
          'alignleft aligncenter alignright alignjustify | fontsizeselect formatselect | quicklink quicktable',
        noneditable_noneditable_class: 'mceNonEditable',
        toolbar_mode: 'sliding',
        contextmenu: 'link table'
      }}
      onEditorChange={handleEditorChange}
    />
  )
}
