<template lang="pug">
  div {{ project }}
</template>

<script>
export default {
  layout: 'home',
  middleware: 'authenticated',
  name: 'EditProject',
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(`projects-manage/${params.id}`)
    return {
      project: data.project
    }
  }
}
</script>

<style <style lang="scss" scoped>
</style>
