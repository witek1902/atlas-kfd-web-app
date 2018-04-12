<template>
  <div>
    <h1>{{ details.title }} - lista ćwiczeń</h1>
    <div class="search-container">
        <el-input placeholder="Wyszukaj po kodzie lub tytule..." v-model="searchQuery"></el-input>
    </div>
    
    <div v-if="filteredExercises && filteredExercises.length && filteredExercises.length > 0">
        <el-row>
            <el-col :span="4" :md="8" :xl="4" :xs="12" v-for="exercise in filteredExercises" :key="exercise.id">
                <el-card class="exercise-container">
                    <router-link :to="{ name: 'ExerciseDetails', params: { exerciseId: exercise.id } }">
                        <img 
                            class="muscle-image" 
                            v-if="exercise.mainImageUrl" 
                            :src="exercise.mainImageUrl" 
                        />
                        <div class="exercise-title">
                            <span>[{{ exercise.code }}] {{ exercise.title }}</span>
                        </div>
                    </router-link>
                </el-card>
            </el-col>
        </el-row>
    </div>
    
    <div class="not-found" v-else>No exercises found.</div>
  </div>
</template>

<script>
import { HTTP } from "../http/ApiClient";

export default {
  name: "ExerciseSectionDetails",
  props: {
    sectionId: String
  },
  data() {
    return {
      searchQuery: "",
      details: {}
    };
  },
  created() {
    this.getSections();
  },
  computed: {
    filteredExercises() {
      if (!this.details || !this.details.exercises) return [];

      return this.details.exercises.filter(e => {
        let inCodeExists = e.code.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1;
        let inTitleExists = e.title.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1;
        return inCodeExists || inTitleExists;
      });
    }
  },
  methods: {
    getSections() {
      HTTP.get("sections/" + this.sectionId).then(response => {
        this.details = response.data;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.exercise-container {
    margin: 10px;
    height: 300px;
}

@media screen and (max-width: 768px) {
  .exercise-container {
    height: 310px;
  }
}

.muscle-image {
    max-width: 100%;
    height: 200px;
    background-size: cover;
    background-position: center;
    display: block;
    margin: 0 auto;
}

.exercise-title {
    padding-bottom: 10px;
    padding-top: 10px;
}

.search-container {
    max-width: 300px;
    margin: 0 auto;
    margin-bottom: 20px;
}

.not-found {
    margin-top: 10px;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both;
}
</style>