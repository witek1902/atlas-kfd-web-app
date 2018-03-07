<template>
  <div>
    <h1>{{ title }}</h1>
    <img src="../assets/logo-kfd.png" />
    <el-button type="primary" @click="changeTitle">Change title</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home ',
  data () {
    return {
      title: 'Inżynierskie Targi Pracy - Atlas ćwiczeń',
      anotherTitle: 'Atlas ćwiczeń'
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
