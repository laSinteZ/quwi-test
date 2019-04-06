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
            .field
              .placeholder(v-show="email") Email
              input(v-model="email" type="text" placeholder="email")
            .field
              .placeholder(v-show="password") Password
              input(v-model="password" type="password" placeholder="password")
            button.button.fullwidth login
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  }
}
</script>

<style lang="scss">
$lighter-gray: #fafafa;
$light-gray: #f4f4f4;
$gray: #e0e0e0;
$dark-gray: #7c7c7c;
$darker-gray: #636363;

$red: #c44512;
$form-red: #d40000;

$light-blue: #b7cae2;
$blue: #4b84da;
$dark-blue: #2668c1;

$navbar-height: 2.875rem;

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
.navbar {
  position: fixed;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  width: 100%;
  height: $navbar-height;
  background: $lighter-gray;
  box-shadow: 0 1px 1px $dark-gray;

  .left,
  .right {
    height: 100%;
  }

  .left {
    .logo {
      display: flex;
      align-items: center;
      height: 100%;
      color: black;
      text-decoration: none;
      font-weight: 700;
      font-size: 1.75rem;
    }
  }

  .right {
    .link {
      display: flex;
      align-items: center;
      padding: 0 15px;
      height: 100%;
      color: $darker-gray;
      text-decoration: none;
      text-transform: uppercase;
      font-size: 0.7rem;
      &:hover {
        background: $gray;
        color: $red;
      }
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
        margin-bottom: 20px;
        text-align: center;
        font-weight: 700;
        font-size: 5rem;
      }
    }
  }
}
</style>
