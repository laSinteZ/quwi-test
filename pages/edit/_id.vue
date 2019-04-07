<template lang="pug">
  .wrapper
    .button.back(@click="$router.go(-1)") ← Back
    validation-observer(v-slot="{ validate }")
      form(@submit.prevent="validate().then(saveName)")
        validation-provider(
          name="name"
          rules="required"
          v-slot="{ validate, errors }"
        )
          .form-row
            .field
              label(
                for="name"
              ) Name
              input(
                @blur="validate"
                v-model="name"
                id="name"
                type="text"
                placeholder="Enter project name"
                autocomplete="false"
                spellcheck="false"
              )
              .button(@click="validate().then(saveName)")
                .loading(v-if="isLoading") LD
                span(v-else) OK
            project-logo(
              :title="name"
              :logo="project.logo"
              :height="80"
              class="logo"
            )
          .input-error {{ errors[0] }}
        .message
          transition(name="fade")
            span.error(v-if="error") Error: {{ error }}
            span.success(v-if="success") Succesfully saved.

</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ProjectLogo from '@/components/ProjectLogo'

export default {
  name: 'EditProject',
  components: {
    ValidationProvider,
    ValidationObserver,
    ProjectLogo
  },
  layout: 'home',
  middleware: 'authenticated',
  data() {
    return {
      name: '',
      isLoading: false,
      error: null,
      success: null
    }
  },
  async asyncData({ $axios, params, error }) {
    try {
      const { data } = await $axios.get(`projects-manage/${params.id}`)
      return {
        project: data.project,
        id: params.id
      }
    } catch (e) {
      error({ statusCode: e.statusCode || 404, message: e.message })
    }
  },
  mounted() {
    this.name = this.project.name
  },
  methods: {
    async saveName() {
      const TIMEOUT = 3000

      this.isLoading = true

      try {
        await this.$axios.post(`projects-manage/update?id=${this.id}`, {
          name: this.name
        })
        this.success = true
        setTimeout(() => (this.success = false), TIMEOUT)
      } catch (error) {
        this.error = error.response.data.message
        setTimeout(() => (this.error = null), TIMEOUT)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/variables.scss';
@import '~assets/css/transitions.scss';

$label-width: 80px;

.button {
  margin-left: 5px;
  text-align: center;
  padding: 12px 16px;
  min-width: 50px;
  outline: none;
  border: none;
  border-radius: 4px;
  background: #395378;
  color: #fff;
  text-transform: uppercase;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  font-weight: 700;
  font-size: 11px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  &.back {
    background: white;
    color: #555555;
    text-shadow: none;
    border: 1px solid #dedede;
    padding: 11px 16px;
    display: inline;
    margin-left: 0;
  }
}

.wrapper {
  margin-right: auto;
  margin-left: auto;
  padding: 20px;
  border: 1px solid #dedede;
  border-radius: 3px;
  background: #fff;
  color: #000;

  .logo {
    margin-left: 20px;
    min-width: 80px;
    width: 80px;
    min-height: 80px;
  }

  .input-error {
    margin-top: 0.5rem;
    margin-left: $label-width;
    color: $form-red;
    font-size: 0.875rem;
  }

  .form-row {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .field {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.875rem;

    label {
      min-width: $label-width;
    }

    input {
      padding: 9px;
      width: 100%;
      outline: none;
      border: 1px solid #ccc;
      border-radius: 2px;
      box-shadow: none;
      font-size: 0.875rem;
    }
  }
}

.message {
  margin-left: $label-width;
  font-size: 0.875rem;
  height: 1.25em;
  .error {
    color: $form-red;
  }
  .success {
    color: $dark-blue;
  }
}
</style>
