<template lang="pug">
  img.logo(
    v-if="logo"
    :src="logo"
  )
  .placeholder(
    v-else
    :style="{ fontSize: height * 0.45 + 'px', background: color }"
  ) {{ shortTitle }}
</template>

<script>
const colors = [
  '#ff0000',
  '#ffff00',
  '#00ff00',
  '#00ffff',
  '#0000ff',
  '#ff00ff'
]

export default {
  name: 'ProjectLogo',
  props: {
    logo: {
      type: String,
      default: ''
    },
    title: {
      required: true,
      type: String
    },
    height: {
      type: Number,
      default: 40
    }
  },
  data() {
    return {
      colors
    }
  },
  computed: {
    shortTitle: function() {
      if (!this.title) return '?'
      const words = this.title.split(' ')
      return (words[0][0] + (words[1] ? words[1][0] : '')).toUpperCase()
    },
    color: function() {
      if (this.shortTitle[0] === '?') return '#4b84da'
      return this.colors[this.shortTitle.charCodeAt(0) % this.colors.length]
    }
  }
}
</script>

<style lang="scss" scoped>
.logo,
.placeholder {
  width: 100%;
  border-radius: 9999px;
}

.logo {
  display: block;
}

.placeholder {
  height: 100%;
  color: white;
  background: red;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}
</style>
