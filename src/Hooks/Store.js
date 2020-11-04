import create from 'zustand'
import produce from 'immer'

// Copied from zustand docs to easily change nested state
export const immer = (config) => (set, get, api) => config((fn) => set(produce(fn)), get, api)

// Used in login, signup, forgot password forms
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
  errorMessage: ' ',
  loading: false,
  completed: false,
  title: '',
  description: '',
  theme: 'light',
  template: 'blank',
  modifyForm: (name, value) =>
    set((state) => {
      state[name] = value
    }),
  resetPortfolioForm: () =>
    set((state) => {
      state.title = ''
      state.description = ''
      state.theme = 'light'
      state.template = 'blank'
      state.errorMessage = ' '
    })
})

// "Global" client-side state
const store = (set) => ({
  portfolioId: localStorage.getItem('portfolioId') || null,
  setPortfolioId: (id) =>
    set((state) => {
      // console.log('Changed Portfolio ID to:', id)
      localStorage.setItem('portfolioId', id)
      state.portfolioId = id
    }),
  pageId: null,
  setPageId: (id) =>
    set((state) => {
      // console.log('Changed Page ID to:', id)
      state.pageId = id
    }),

  loading: false,
  setLoading: (value) =>
    set((state) => {
      state.loading = value
    }),

  sectionIndex: null,
  setSectionIndex: (index) =>
    set((state) => {
      state.sectionIndex = index
    }),

  elementIndex: 0,
  setElementIndex: (index) =>
    set((state) => {
      state.elementIndex = index
    }),

  currentElement: null,
  setCurrentElement: (element) =>
    set((state) => {
      state.currentElement = element
    }),

  startEditingElement: (sectionIndex, elementIndex, element) =>
    set((state) => {
      state.sectionIndex = sectionIndex
      state.elementIndex = elementIndex
      state.currentElement = { id: element.id, data: element.data }
      // console.log(
      //   `Start editing element ${elementIndex} at section ${sectionIndex}: ${element.id} = ${element.data}`
      // )
    }),
  editCurrentElement: (data) =>
    set((state) => {
      // console.log(`Changed ${state.elementIndex} at section ${state.sectionIndex}: ${data}`)
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
    }),

  finishEditingSection: () =>
    set((state) => {
      state.sectionIndex = null
      state.elementIndex = 0
      state.currentElement = null
    })
})

export const useFormStore = create(immer(formStore))

export const useStore = create(immer(store))
