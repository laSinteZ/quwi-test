export default function({ $axios, redirect, store }) {
  $axios.setToken(store.state.auth, 'Bearer')

  $axios.onError(error => {
    if (error.response.status === 401) {
      store.dispatch('logout')
      redirect('/login')
    }
  })
}
