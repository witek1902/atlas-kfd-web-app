<template>
    <div class="admin-container">
        <h1>Add new section</h1>
        <form @submit.prevent="submitForm">
            <el-input placeholder="Title" v-model="title" />
            <el-input placeholder="Image url" v-model="imgUrl" />
            <el-button native-type="submit" type="success">Create</el-button>
        </form>
        <hr/>
        <h1>Dodaj ćwiczenie do sekcji</h1>
        <form @submit.prevent="addExerciseToSection">
            <el-input placeholder="Exercise id" v-model="addExercise.exerciseId" />
            <el-input placeholder="Exercise section id" v-model="addExercise.exerciseSectionId" />
            <el-button native-type="submit" type="success">Dodaj ćwiczenie do sekcji</el-button>
        </form>
    </div>
</template>

<script>
import {HTTP} from './ApiClient'

export default {
  name: 'AdminPanel',
  data () {
      return {
        title: "",
        imgUrl: "",
        addExercise: {
            exerciseId: "",
            exerciseSectionId: ""
        }
      }
  },
  methods: {
      submitForm () {
          HTTP.post('sections', {
              title: this.title,
              image: this.imgUrl
          }).then(response => {
              this.title = '';
              this.imgUrl = '';
              this.$notify({
                title: 'Success',
                message: 'This is a success message',
                type: 'success'
              });
          })
      },
      addExerciseToSection () {
          HTTP.post('addExerciseToSection', {
              exerciseId: this.addExercise.exerciseId,
              exerciseSectionId: this.addExercise.exerciseSectionId
          }).then(response => {
              this.addExercise.exerciseId = '';
              this.addExercise.exerciseSectionId = '';
               this.$notify({
                title: 'Udało się!',
                message: 'Dodano ćwiczenie do sekcji!',
                type: 'success'
              });
          })
      }
  }
}
</script>


<style scoped>
    .admin-container {
        width: 80%;
        margin: 0 auto;
    }
    input {
        width: 300px;
    }
</style>