<template>
  <div>
    <h1>{{ details.title }} - lista ćwiczeń</h1>
    <div class="search-container">
        <el-input placeholder="Search by code or title..." v-model="searchQuery"></el-input>
    </div>
    
    <div v-if="filteredExercises && filteredExercises.length && filteredExercises.length > 0">
        
        <div class="exercise-container" v-for="exercise in filteredExercises" :key="exercise.id">
            
            <router-link :to="{ name: 'ExerciseDetails', params: { exerciseId: exercise.id } }">
                <p class="exercise-title">[{{ exercise.code }}] {{ exercise.title }}</p>
                <img class="muscle-image" v-if="exercise.mainImageUrl" :src="exercise.mainImageUrl" />
            </router-link>
            
        </div>

    </div>
    
    <div class="not-found" v-else>No exercises found.</div>
  </div>
</template>

<script>
import {HTTP} from '../http/api-client';

export default {
  name: 'ExerciseSectionDetails',
  props: {
      sectionId: String
  },
  data () {
    return {
        searchQuery: '',
        details: {}
    }
  },
  created() {
    HTTP.get('sections/' + this.sectionId)
    .then(response => {
      console.log(response);
      this.details = response.data;
    })
  },
  computed: {
      filteredExercises() {
          return this.details.exercises.filter(e => {
              let inCodeExists = e.code.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1
              let inTitleExists = e.title.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1
              return inCodeExists || inTitleExists
          })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.exercise-container {
    width: 30%;
    display: inline-block;
    margin: 10px;
    vertical-align: top;
}

.muscle-image {
    max-width: 100%;
    max-height: 300px;
}

.exercise-title {
    height: 60px;
}

.search-container {
    max-width: 300px;
    margin: 0 auto;
}

.not-found {
    margin-top: 10px;
}
</style>