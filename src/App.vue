<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/sections">Exercise sections</router-link>
      <router-link to="/admin">Admin</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
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
  color: #42b983;
}

nav {
  background-color: #42b983;
  padding: 10px;
  height: 20px;
  margin-bottom: 20px;
}

nav > a {
  text-decoration: none;
  color: white;
  margin-right: 20px;
}
</style>
