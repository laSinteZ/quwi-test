<template lang="pug">
  div
    header.navbar
      .left
        nuxt-link.logo(to="/") Q
      .right
        nuxt-link.link(to="/") Projects
        .link(@click="logout") Logout
    .main
      nuxt.container
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({ stateLogout: 'logout' }),
    async logout() {
      try {
        await this.$axios.post('auth/logout', {
          anywhere: false
        })
      } catch (e) {
      } finally {
        this.stateLogout()
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/navbar.scss';
@import '~assets/css/variables.scss';

.main {
  padding-top: $navbar-height;
  min-height: 100vh;
  background: $light-gray;
  .container {
    margin: 15px auto 50px;
    max-width: 600px;
  }
}
</style>
