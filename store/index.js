import cookieparser from 'cookieparser'
import Cookie from 'js-cookie'

const TYPES = {
  SET_AUTH: 'Setting auth token'
}

export const state = () => ({
  auth: null
})

export const mutations = {
  [TYPES.SET_AUTH](state, auth) {
    state.auth = auth
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let auth = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      auth = parsed.auth
    }
    commit(TYPES.SET_AUTH, auth)
    this.$axios.setToken(auth, 'Bearer')
  },

  setTokenAndCookie({ commit }, token) {
    commit(TYPES.SET_AUTH, token)
    Cookie.set('auth', token)
    this.$axios.setToken(token, 'Bearer')
  },

  logout({ commit }) {
    commit(TYPES.SET_AUTH, null)
    Cookie.remove('auth')
    this.$axios.setToken(false)
  }
}
