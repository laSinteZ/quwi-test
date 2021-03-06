<template lang="pug">
  div
    header.navbar
      .left
        a.logo(href="https://quwi.com") Q
      .right
    main.main
      .login-form-container
        .title Login
        .login-form
          h1.logo Q
          validation-observer(v-slot="{ validate, invalid }")
            form(@submit.prevent="validate().then(login)")
              validation-provider(
                name="email"
                rules="required|email"
                v-slot="{ validate, errors }"
              )
                .field(:class="{'has-error': loginError || errors[0]}")
                  .placeholder(v-show="loginError || errors[0] || email") {{ loginError ? loginError : errors[0] ? errors[0] : 'Email' }}
                  input(
                    @blur="validate"
                    v-model="email"
                    type="text"
                    placeholder="email"
                    autofocus
                    autocomplete="username"
                  )
              validation-provider(
                name="password"
                rules="required"
                v-slot="{ validate, errors }"
              )
                .field(:class="{'has-error': errors[0]}")
                  .placeholder(v-show="errors[0] || password") {{ errors[0] ? errors[0] : 'Password' }}
                  input(
                    @blur="validate"
                    v-model="password"
                    type="password"
                    placeholder="password"
                    autocomplete="current-password"
                  )
              button.button.fullwidth(
                :class="{disabled: invalid || isLoading}"
               )
                .spinner(v-if="isLoading")
                span(v-else) login
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { mapActions } from 'vuex'

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  middleware: 'notAuthenticated',
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,
      loginError: null
    }
  },
  methods: {
    ...mapActions(['setTokenAndCookie']),
    async login() {
      const TIMEOUT = 3000

      this.isLoading = true

      try {
        const { data } = await this.$axios.post('auth/login', {
          email: this.email,
          password: this.password
        })

        this.setTokenAndCookie(data.token)
        this.$router.push('/')
      } catch (error) {
        this.loginError = error.response.data
          ? error.response.data.first_errors.email
          : error
        setTimeout(() => (this.loginError = null), TIMEOUT)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/navbar.scss';
@import '~assets/css/variables.scss';
@import '~assets/css/loading.scss';

button.button {
  font-size: 1.125rem;
  border-radius: 9px;
  background: $dark-blue;
  height: 53px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  outline: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &.fullwidth {
    width: 100%;
  }
  &.disabled {
    opacity: 0.8;
    pointer-events: none;
    cursor: not-allowed;
  }
}

.field {
  position: relative;
  margin-bottom: 30px;
  font-size: 0.875rem;
  .placeholder {
    position: absolute;
    top: -0.5rem;
    margin: 0 10px;
    padding: 0 3px;
    background: white;
    color: $blue;
  }
  input {
    padding: 15px;
    width: 100%;
    outline: none;
    border: 1px solid $blue;
    border-radius: 5px;
    font-size: 0.875rem;
    &::placeholder {
      font-style: italic;
      color: $light-blue;
    }
  }
  &.has-error {
    .placeholder {
      color: $form-red;
    }
    input {
      border: 1px solid $form-red;
    }
  }
}

.main {
  padding-top: $navbar-height;
  min-height: 100vh;
  background: $light-gray;
  .login-form-container {
    margin: 50px auto;
    width: 440px;
    text-align: center;
    .title {
      margin-bottom: 1.75rem;
      font-size: 1.75rem;
    }
    .login-form {
      padding: 25px 40px 35px;
      border: 1px solid #e7e7e7;
      border-radius: 7px;
      background: white;
      box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.19);
      .logo {
        pointer-events: none;
        margin-bottom: 20px;
        text-align: center;
        font-weight: 700;
        font-size: 5rem;
      }
    }
  }
}
</style>
