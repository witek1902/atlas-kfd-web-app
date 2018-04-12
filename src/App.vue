<template>
  <div id="app">
    <nav class="main-nav">
      <router-link to="/">Strona główna</router-link>
      <router-link to="/exerciseSections">Sekcje</router-link>
    </nav>
    <div id="app-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  margin: 0px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app-container {
  margin-top: 10px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #18a3d4;
}

.main-nav {
  background-color: #18a3d4;
  padding: 10px;
  height: 20px;
}

.main-nav > a {
  color: white;
  text-decoration: none;
  margin-right: 20px;
}
</style>
