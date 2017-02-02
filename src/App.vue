<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
    <el-button @click="connectServer">Hi I'am a button from element-ui</el-button>
  </div>
</template>

<script>
  import Hello from './components/Hello'

  export default {
    name: 'app',
    components: {
      Hello
    },
    methods: {
      connectServer: function () {
        this.$http.get('http://127.0.0.1:8081/user/ssthouse').then(response => {
          let userinfo = response.body
          console.log(userinfo.username)
          console.log(userinfo.age)
        })
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
