<template>
    <div class="exercise-details-container">
      <h1>{{ details.title }} - {{ details.subtitle }}</h1>
      <hr/>
      <div>
          <div class="info">
            <p><strong>Główne mięśnie: </strong> {{ details.mainMuscles}}</p>
            <p><strong>Mięśnie pomocnicze: </strong> {{ details.auxiliaryMuscles}}</p>
            <p><strong>Stabilizatory: </strong> {{ details.stabilizers}}</p>
            <p><strong>Wykonanie: </strong> {{ details.execution }}</p>
            <p><strong>Uwagi dodatkowe: </strong> {{ details.remarks }}</p>
          </div>
          <div class="video">
            <iframe width="100%" height="400" :src="details.embedVideoUrl"></iframe>
          </div>
      </div>
      <hr/>
      <h2>Zdjęcia:</h2>
      <div v-for="image in details.imageUrls" :key="image">
          <img :src="image" />
      </div>
    </div>  
</template>

<script>
import {HTTP} from '../http/api-client';

export default {
  name: 'ExerciseDetails',
  props: {
      exerciseId: String
  },
  data () {
    return {
        details: {}
    }
  },
  created() {
    HTTP.get('exercises/' + this.exerciseId)
    .then(response => {
      console.log(response)
      this.details = response.data
    })
  }
}
</script>

<style scoped>
  .exercise-details-container {
    width: 80%;
    margin: 0 auto;
  }

  .info {
    width: 50%;
    display:table-cell;
    vertical-align: top;
    padding-right: 10px;
  }

  .video {
    width: 50%;
    display:table-cell;
  }
</style>
