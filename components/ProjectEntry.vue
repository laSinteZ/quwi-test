<template lang="pug">
  .project-wrapper(@click="navigate")
    .logo
    .title Super Project
    .status Active
    .time
      .entry-row
        .title time this week
        .value 00:00:00
      .entry-row
        .title this month
        .value 00:00:00
      .entry-row
        .title total
        .value 00:00:00
</template>

<script>
export default {
  methods: {
    navigate() {
      const id = 11
      this.$router.push({ name: 'edit-id', params: { id } })
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
  border: 1px solid #dedede;
  border-radius: 3px;
  background: white;
  font-size: 0.75rem;

  &:hover {
    background: #ececec;
    cursor: pointer;
  }

  .logo {
    width: 40px;
    height: 40px;
    border-radius: 9999px;
    background: #9400d3;
    margin-right: 15px;
  }

  .title {
    font-weight: bold;
    flex-grow: 1;
  }

  .status {
    font-weight: bold;
    flex-grow: 1;
    text-align: center;
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
