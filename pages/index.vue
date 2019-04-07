<template lang="pug">
  div
    project-entry(
      v-for="project in projects"
      :key="`project-${project.id}`"
      :title="project.name"
      :id="project.id"
      :logo="project.logo_url"
      :is-active="Boolean(project.is_active)"
      :time-week="project.spent_time_week"
      :time-month="project.spent_time_month"
      :time-all="project.spent_time_all"
    )
</template>

<script>
import ProjectEntry from '@/components/ProjectEntry'
export default {
  layout: 'home',
  middleware: 'authenticated',
  name: 'Projects',
  components: {
    ProjectEntry
  },
  async asyncData({ $axios, error }) {
    try {
      const { data } = await $axios.get('projects-manage')
      const projects = await Promise.all(
        data.projects.map(x => $axios.get(`projects-manage/${x.id}`))
      )
      return {
        projects: projects.map(x => x.data.project)
      }
    } catch (e) {
      error({ statusCode: e.statusCode || 404, message: e.message })
    }
  }
}
</script>
