<template lang="pug">
  div
    header.navbar
      .left
        a.logo(href="https://quwi.com") Q
      .right
        nuxt-link.link(to="/") Projects
        a.link(href="#") Logout
    nuxt.main
</template>

<style lang="scss" scoped>
@import '~assets/css/navbar.scss';
@import '~assets/css/variables.scss';

.main {
  padding-top: $navbar-height;
  min-height: 100vh;
  background: $light-gray;
}
</style>
