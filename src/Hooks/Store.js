import create from 'zustand'
import produce from 'immer'

export const immer = (config) => (set, get, api) => config((fn) => set(produce(fn)), get, api)

const formStore = (set) => ({
  email: '',
  password: '',
  showPassword: false,
  rememberMe: false,
  loginFailed: false,
  username: '',
  firstName: '',
  lastName: '',
  signUpFailed: false,
  confirmationCode: '',
  newPassword: '',
  errorMessage: '',
  loading: false,
  completed: false,
  modifyForm: (name, value) =>
    set((state) => {
      state[name] = value
    })
})

const store = (set) => ({
  portfolioId: null,
  setPortfolioId: (id) =>
    set((state) => {
      state.portfolioId = id
    }),
  pageId: null,
  setPageId: (id) =>
    set((state) => {
      console.log('Changed Page ID to:', id)
      state.pageId = id
    }),
  // sections: {},
  // modifySection: (sectionIndex, elementIndex, name, value) =>
  //   set((state) => {
  //     if (state.pageId) {
  //       // Create the copy of the n-th element with the new data
  //       const newElement = { id: name, data: value }

  //       // Replaces the element at the given index with the new element
  //       const newSection = Array.from(state.sections[state.pageId][sectionIndex])
  //       newSection.splice(elementIndex, 1, newElement)

  //       const newPage = Array.from(state.sections[state.pageId])
  //       newPage.splice(sectionIndex, 1, newSection)

  //       state.sections = { ...state.sections, [state.pageId]: newPage }
  //     }
  //   }),

  sectionIndex: null,
  setSectionIndex: (index) => set((state) => (state.sectionIndex = index)),

  elementIndex: 0,
  setElementIndex: (index) => set((state) => (state.elementIndex = index)),

  currentElement: null,

  startEditingElement: (sectionIndex, elementIndex, element) =>
    set((state) => {
      state.sectionIndex = sectionIndex
      state.elementIndex = elementIndex
      state.currentElement = { id: element.id, data: element.data }
    }),
  editCurrentElement: (data) =>
    set((state) => {
      state.currentElement.data = data
    }),
  finishEditingElement: (currentPage, editPageFn) =>
    set((state) => {
      // Create the copy of the n-th element with the new data
      const newElement = { id: state.currentElement.id, data: state.currentElement.data }

      // Replaces the element at the given index with the new element
      const newSection = Array.from(currentPage.content.sections[state.sectionIndex])
      newSection.splice(state.elementIndex, 1, newElement)

      const newPageSections = Array.from(currentPage.content.sections)
      newPageSections.splice(state.sectionIndex, 1, newSection)

      const patchDetails = { content: { sections: newPageSections } }

      editPageFn({ pageId: state.pageId, patchDetails })
      state.sectionIndex = null
      state.elementIndex = 0
      state.currentElement = null
    })
})

export const useFormStore = create(immer(formStore))

export const useStore = create(immer(store))
