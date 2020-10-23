import React, { useState, createContext } from 'react'

export const PortfolioContext = createContext({
  pageId: null,
  setPageId: null,
  sections: {},
  setSections: null,
  editableSections: new Set(),
  startSectionEdit: null,
  modifySection: null,
  finishSectionEdit: null,
  clearAllSections: null
})

const PortfolioProvider = ({ children }) => {
  const [pageId, setPageId] = useState(null)
  const [sections, setSections] = useState({})
  const [editableSections, setEditableSections] = useState(new Set())

  // Makes a section editable (i.e. non-disabled such that you can enter text)
  // by adding its index into the set of editable sections
  function startSectionEdit(index) {
    setEditableSections((sections) => {
      const newSections = new Set(sections)
      newSections.add(index)
      return newSections
    })
  }

  // Replaces the value of the data field identified by the name argument in the
  // n-th (where n === index) section of the current page.
  // e.g. modifySection(0, 'paragraph1', 'Hello') replaces the value of the
  // 0-th section's 'paragraph1' field in its data object with 'Hello'
  function modifySection(sectionIndex, elementIndex, name, value) {
    setSections((sections) => {
      // Create the copy of the n-th element with the new data
      const newElement = { id: name, data: value }

      // Replaces the element at the given index with the new element
      const newSection = Array.from(sections[pageId][sectionIndex])
      newSection.splice(elementIndex, 1, newElement)

      const newPage = Array.from(sections[pageId])
      newPage.splice(sectionIndex, 1, newSection)

      return {
        ...sections,
        [pageId]: newPage
      }
    })
  }

  // Makes a section non-editable (i.e. disabled such that you can no longer
  // enter text) by removing its index from the set of editable sections
  function finishSectionEdit(index) {
    setEditableSections((sections) => {
      const newSections = new Set(sections)
      newSections.delete(index)
      return newSections
    })
  }

  // Makes all sections non-editable (i.e. disabled) by clearing the set of
  // editable sections
  function resetEditState() {
    setEditableSections((sections) => {
      const newSections = new Set(sections)
      newSections.clear()
      return newSections
    })
  }

  // To be called upon by other components, if need to use/change the theme
  const contextValue = {
    pageId,
    setPageId,
    sections,
    setSections,
    editableSections,
    startSectionEdit,
    modifySection,
    finishSectionEdit,
    resetEditState
  }

  return <PortfolioContext.Provider value={contextValue}>{children}</PortfolioContext.Provider>
}

export default PortfolioProvider
