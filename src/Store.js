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
  loggedIn: null,
  setLoggedIn: (isLoggedIn) =>
    set((state) => {
      state.loggedIn = isLoggedIn
    }),

  user: null,
  setUser: (user) => {
    set((state) => {
      state.user = user
    })
  },
  modifyUser: (name, value) =>
    set((state) => {
      state.user[name] = value
    }),

  portfolios: null,
  setPortfolios: null,
  portfolioId: null,
  setPortfolioId: (portfolioId) =>
    set((state) => {
      state.portfolioId = portfolioId
    }),

  addPortfolio: (portfolio) => {
    set((state) => {
      state.portfolios = state.portfolios.push({
        id: portfolio.id,
        title: portfolio.title,
        description: portfolio.description,
        pageOrder: portfolio.pageOrder,
        pages: []
      })
    })
  },

  deletePortfolio: (portfolioId) =>
    set((state) => {
      state.portfolios = state.portfolios.filter((portfolio) => portfolio.id !== portfolioId)
    }),

  pageIndex: 0,
  setPageIndex: (pageIndex) =>
    set((state) => {
      state.pageIndex = pageIndex
    }),

  addPage: (page) =>
    set((state) => {
      state.portfolios[state.portfolioId].pages.push(page)
    }),
  editPageTitle: (title) =>
    set((state) => {
      state.portfolios[state.portfolioId].pages[state.pageIndex].title = title
    }),
  deletePage: (pageId) =>
    set((state) => {
      state.portfolios[state.portfolioId].pages.filter((page) => page.id !== pageId)
    }),

  addSectionToFront: (section) =>
    set((state) => {
      state.portfolios[state.portfolioId].pages[state.pageIndex].content.sections.unshift(section)
    }),
  addSectionToBack: (section) =>
    set((state) => {
      state.portfolios[state.portfolioId].pages[state.pageIndex].content.sections.push(section)
    })
})

export const useFormStore = create(immer(formStore))

export const useStore = create(immer(store))
