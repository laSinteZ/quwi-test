<template lang="pug">
  .error-wrapper
    .contaier
      h1 {{ error.statusCode }}
      h2 {{ error.message }}
      nuxt-link(to="/" class="back") To to main page
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {}
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
.back {
  color: black;
  font-size: 1.25rem;
}
</style>
