<template lang="pug">
  div
    header.navbar
      .left
        a.logo(href="https://quwi.com") Q
      .right
        a.link(href="#") Signup
    main.main
      .login-form-container
        .title Login
        .login-form
          h1.logo Q
          form
            validation-provider(
              name="email"
              rules="required|email"
              v-slot="{ validate, errors }"
            )
              .field(:class="{'has-error': errors[0]}")
                .placeholder(v-show="errors[0] || email") {{ errors[0] ? errors[0] : 'Email' }}
                input(
                  @blur="validate"
                  v-model="email"
                  type="text"
                  placeholder="email"
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
                )
            button.button.fullwidth login
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationProvider
  },
  data() {
    return {
      email: '',
      password: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/navbar.scss';
@import '~assets/css/variables.scss';

button.button {
  font-size: 1.125rem;
  border-radius: 9px;
  background: $dark-blue;
  padding: 15px;
  color: white;
  outline: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &.fullwidth {
    width: 100%;
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
