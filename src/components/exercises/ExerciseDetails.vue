<template>
  <div class="exercise-details-container">
    <div v-if="details">
      
      <h1>{{ details.title }} <span v-if="details.subtitle">-</span> {{ details.subtitle }}</h1>
      
      <el-tabs type="border-card" v-model="activeTab">
        
        <el-tab-pane label="Pracujące mięśnie" name="main">
          <h3>Główne</h3>
          <p>{{ details.mainMuscles }}</p>
          <h3>Pomocnicze</h3>
          <p>{{ details.auxiliaryMuscles }}</p>
          <h3>Stabilizatory</h3>
          <p>{{ details.stabilizers }}</p>
          <img :src="details.muscleImageUrl" alt="Zdjęcie pracujących mięśni" />
        </el-tab-pane>
        
        <el-tab-pane label="Zdjęcia" name="images">
          <el-carousel :interval="2000" height="400px">
            <el-carousel-item v-for="image in details.imageUrls" :key="image">
              <img :src="image" />
            </el-carousel-item>
          </el-carousel>
        </el-tab-pane>
        
        <el-tab-pane label="Wykonanie i uwagi dodatkowe" name="execution">
          <h3>Wykonanie</h3> 
          <p>{{ details.execution }}</p>
          <h3>Uwagi dodatkowe </h3>
          <p>{{ details.remarks }}</p>
        </el-tab-pane>
        
        <el-tab-pane label="Wideo" name="video">
          <iframe width="80%" height="600" :src="details.embedVideoUrl"></iframe>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ExerciseDetails',
  props: {
    exerciseId: {
      required: true
    }
  },
  data () {
    return {
      activeTab: 'main',
    }
  },
  created () {
    this.fetchExercise(this.urlExId)
  },
  computed: {
    ...mapGetters([
      'activeExercise'
    ]),
    urlExId () {
      return this.$route.params.exerciseId
    },
    details () {
      return this.activeExercise
    }
  },
  watch: {
    activeExercise (newVal) {
      if (newVal === undefined) {
        this.fetchExercise(this.urlExId)
      }
    }
  },
  methods: {
    ...mapActions([
      'fetchExercise'
    ])
  }
}
</script>

<style scoped>
  .exercise-details-container {
    width: 70%;
    margin: 0 auto;
  }

  @media screen and (max-width: 992px) {
  .exercise-details-container {
    width: 100%;
    margin: 0 auto;
  }
}

</style>
