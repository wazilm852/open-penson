<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import './style/icon/iconfont.css'
export default {
  name: 'App'
}
</script>

<style>
html,body {
  height: 100%;
}
#app {
  height:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
