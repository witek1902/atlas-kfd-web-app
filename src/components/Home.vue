<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <img src="../assets/logo.png">
    <el-button type="primary" @click="changeTitle">Zmień tytuł</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      title: 'Atlas ćwiczeń',
      anotherTitle: 'Inżynierskie Targi Pracy'
    };
  },
  methods: {
    changeTitle () {
      let newTitle = this.anotherTitle;
      this.anotherTitle = this.title;
      this.title = newTitle;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
