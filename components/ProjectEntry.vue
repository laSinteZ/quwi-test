<template lang="pug">
  .project-wrapper(
    @click="navigate"
    :class="{'is-inactive': !isActive}"
  )
    .logo
      project-logo(
        :title="title"
        :logo="logo"
      )
    .title {{ title }}
    .status(:class="{'is-active': isActive}") {{ isActive ? 'Active' : 'Inactive'}}
    .time
      .entry-row
        .title time this week
        .value {{ timeWeek | formatTime }}
      .entry-row
        .title this month
        .value {{ timeMonth | formatTime }}
      .entry-row
        .title total
        .value {{ timeAll | formatTime }}
</template>

<script>
import ProjectLogo from '@/components/ProjectLogo'

export default {
  components: {
    ProjectLogo
  },
  filters: {
    formatTime: function(value) {
      const hours = Math.floor(value / 3600)
      const minutes = Math.floor((value - 3600 * hours) / 60)
      const seconds = value - hours * 3600 - minutes * 60

      return `${hours < 10 ? '0' + hours : hours}:${
        minutes < 10 ? '0' + minutes : minutes
      }:${seconds < 10 ? '0' + seconds : seconds}`
    }
  },
  props: {
    id: {
      required: true,
      type: Number
    },
    title: {
      required: true,
      type: String
    },
    logo: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      required: true
    },
    timeWeek: {
      type: Number,
      required: true
    },
    timeMonth: {
      type: Number,
      required: true
    },
    timeAll: {
      type: Number,
      required: true
    }
  },
  methods: {
    navigate() {
      this.$router.push({ name: 'edit-id', params: { id: this.id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.project-wrapper {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 18px 20px 20px 25px;
  margin-bottom: 6px;
  border: 1px solid #dedede;
  border-radius: 3px;
  background: white;
  font-size: 0.75rem;

  &.is-inactive {
    opacity: 0.5;
  }

  &:hover {
    background: #ececec;
    cursor: pointer;
  }

  .logo {
    width: 40px;
    height: 40px;
    margin-right: 15px;
  }

  .title {
    font-weight: bold;
    flex-grow: 1;
  }

  .status {
    font-weight: bold;
    min-width: 10rem;
    width: 10rem;
    text-align: center;
    color: #777;
    &.is-active {
      color: green;
    }
  }

  .time {
    display: flex;
    flex-direction: column;
    .entry-row {
      display: flex;
      justify-content: space-between;
      margin-top: 4px;
      .title {
        font-weight: normal;
      }
      .value {
        margin-left: 30px;
        font-weight: bold;
      }
    }
  }
}
</style>
