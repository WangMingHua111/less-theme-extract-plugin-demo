<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div>
    <h3>主题</h3>
    <button v-for="theme in themes" :key="theme" @click="c(theme)">切换{{theme}}主题</button>
  </div>
  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data: function () {
    return {
      themes: [],
    }
  },
  methods: {
    c: function (t) {
      window.themeSwitcher.setTheme(t).then(() => {
        console.log(`切换主题成功：${t}`)
      })
    },
  },
  mounted: function () {
    setTimeout(() => {
      this.themes = window.themeSwitcher.getThemes()
    }, 1000)
  },
}
</script>

<style lang="less">
@global-color: 'fff';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: @global-color;
  margin-top: 60px;
}
</style>
