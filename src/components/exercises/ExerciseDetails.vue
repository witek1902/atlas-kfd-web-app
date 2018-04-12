<template>
  <div class="exercise-details-container">
    <h1>{{ details.title }} <span v-if="details.subtitle">-</span> {{ details.subtitle }}</h1>
    
    <el-tabs type="border-card" v-model="activeTab">
      
      <el-tab-pane label="Pracujące mięśnie" name="main">
        <h3>Główne</h3>
        <p>{{ details.mainMuscles }}</p>
        <h3>Pomocnicze</h3>
        <p>{{ details.auxiliaryMuscles }}</p>
        <h3>Stabilizatory</h3>
        <p>{{ details.stabilizers }}</p>
        <img class="muscle-image" :src="details.muscleImageUrl" alt="Zdjęcie pracujących mięśni" />
      </el-tab-pane>
      
      <el-tab-pane label="Zdjęcia" name="images">
        <el-carousel :interval="2000" height="400px">
          <el-carousel-item v-for="image in details.imageUrls" :key="image">
            <img class="muscle-image" :src="image" />
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
        <div class="video">
          <iframe width="80%" height="100%" :src="details.embedVideoUrl"></iframe>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { HTTP } from "../http/ApiClient";

export default {
  name: "ExerciseDetails",
  props: {
    exerciseId: Number
  },
  data() {
    return {
      activeTab: "main",
      details: {}
    };
  },
  created() {
    HTTP.get("exercises/" + this.exerciseId).then(response => {
      this.details = response.data;
    });
  }
};
</script>

<style scoped>
.exercise-details-container {
  width: 70%;
  margin: 0 auto;
}

@media screen and (max-width: 992px) {
  .muscle-image {
    width: 100%;
  }
}

@media screen and (max-width: 992px) {
  .exercise-details-container {
    width: 100%;
    margin: 0 auto;
  }

  .video {
    height: 300px;
  }
}

.video {
  height: 600px;
}
</style>
