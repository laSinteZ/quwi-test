<template lang="pug">
  .error-wrapper
    .container
      h1 {{ error.statusCode }}
      h2 {{ messages[error.statusCode] }}
      nuxt-link(v-if="error.statusCode === 401" to="/login" class="link") To the login page
      nuxt-link(v-if="error.statusCode === 404" to="/" class="link") To the main page
      .link(v-if="error.statusCode === 500" @click="reload") Refresh page
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      messages: {
        400: 'Problem with application. Please contact the developers.',
        500: 'Problem with servers. Try again later.',
        404: 'Page not found. Please try other page.',
        401: 'Authentication problems. Please try loggin in again.'
      }
    }
  },
  mounted() {
    // Clean cookies from wrong cookie
    if (this.error.statusCode === 401) {
      this.stateLogout()
    }
  },
  methods: {
    ...mapActions({ stateLogout: 'logout' }),
    reload() {
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/variables.scss';

.error-wrapper {
  min-height: 100vh;
  background: $light-gray;
  display: flex;
  align-items: center;
  justify-content: center;
  .container {
    max-width: 600px;
  }
}
h2 {
  margin-bottom: 15px;
}
.link {
  text-decoration: underline;
  color: black;
  font-size: 1.25rem;
  cursor: pointer;
}
</style>
