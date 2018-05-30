<template>
  <div id="app">
    <nav class="main-nav">
      <router-link to="/">Atlas ćwiczeń KFD.PL - Strona główna</router-link>
    </nav>
    <div id="app-container">
      <router-view/>
    </div>
    <footer>
      <div class="footer-links">
        <ul>
          <li><a href="https://sklep.kfd.pl/">Sklep KFD.PL</a></li>
            <li><a href="http://akademia.kfd.pl/">Akademia KFD</a></li>
            <li><a href="https://www.kfd.pl/">Forum KFD.PL</a></li>
            <li><a href="http://nutrition.kfd.pl/">KFD Nutrition</a></li>
        </ul>
      </div>
      <div class="copyright">
        <p><a href="http://rwitkowski.pl">Robert Witkowski</a> @ Copyright 2018</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
body {
  margin: 0px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app-container {
  margin-top: 10px;
}

h1,
h2 {
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

footer {
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  margin-top: 20px;
}

.footer-links {
  text-align: center;
}

.footer-links ul {
  padding: 0;
  list-style-type: none;
  margin: 0;
}

.footer-links li {
  display: inline;
}

.footer-links a {
  text-decoration: none;
}

.copyright {
  text-align: center;
  margin-top: 15px;
  margin-bottom: 10px;
}

.copyright p {
  margin: 0;
  color: #b3b3b3;
  font-size: 12px;
}
</style>
