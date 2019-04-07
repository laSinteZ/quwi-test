export default function({ $axios, redirect, store }) {
  $axios.setToken(store.state.auth, 'Bearer')

  $axios.onError(error => {
    // Redirect only client requests, since only it can clean cookies
    if (error.response.status === 401 && process.isClient) {
      store.dispatch('logout')
      redirect('/login')
    }
  })
}
