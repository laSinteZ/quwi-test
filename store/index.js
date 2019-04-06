import cookieparser from 'cookieparser'
import cookie from 'js-cookie'

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
      try {
        auth = JSON.parse(parsed.auth)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit(TYPES.SET_AUTH, auth)
  },

  setTokenAndCookie({ commit }, token) {
    commit(TYPES.SET_AUTH, token)
    cookie.set('auth', token)
  }
}