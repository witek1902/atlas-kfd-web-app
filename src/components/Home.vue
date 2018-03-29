<template>
  <div>
    <h1>{{ title }} <el-button type="primary" @click="changeTitle">Zmień tytuł</el-button></h1>
    <img src="../assets/logo-kfd.png" />
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      title: 'Atlas ćwiczeń KFD.PL',
      anotherTitle: 'Najlepsza aplikacja na świecie'
    }
  },
  methods: {
    changeTitle () {
      let newTitle = this.anotherTitle; 
      this.anotherTitle = this.title;
      this.title = newTitle;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
