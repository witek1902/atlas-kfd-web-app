<template>
  <div>
    <h1>{{ details.title }} - lista ćwiczeń</h1>
    <div class="search-container">
        <el-input placeholder="Search by code or title..." v-model="searchQuery"></el-input>
    </div>
    
    <div v-if="filteredExercises && filteredExercises.length && filteredExercises.length > 0">
        <el-row>
            <el-col :span="8" v-for="exercise in filteredExercises" :key="exercise.id">
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
                    <div class="bottom clearfix">
                        <el-button 
                            size="small"
                            type="primary"
                            icon="el-icon-delete" 
                            @click="removeFromSection(exercise.id)"
                        />
                    </div>
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
        let inCodeExists =
          e.code.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1;
        let inTitleExists =
          e.title.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1;
        return inCodeExists || inTitleExists;
      });
    }
  },
  methods: {
    removeFromSection(exerciseId) {
      HTTP.delete("sections/" + this.sectionId + "/exercises/" + exerciseId)
        .then(response => {
          this.$notify({
            title: "Success",
            message: "Adding new Exercise to Section successfully!",
            type: "success"
          });
          this.getSections();
        })
        .catch(error => {
          this.$notify({
            title: "Validation error",
            message: error.response.data,
            type: "error"
          });
        });
    },
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
    padding: 15px;
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