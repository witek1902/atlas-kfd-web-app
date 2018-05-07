<template>
  <div>
    <section id="section-details" v-if="details">

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

    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ExerciseSectionDetails',
  props: {
    sectionId: {
      required: true
    }
  },
  data() {
    return {
      searchQuery: ''
    }
  },
  created() {
    this.fetchSection(this.sectionId)
  },
  computed: {
    ...mapGetters([
      'activeSection'
    ]),
    details () {
      return this.activeSection
    },
    filteredExercises() {
      if (!this.details || !this.details.exercises) return [];
      
      function containsText (text, searchedText) {
        return text.toLowerCase().indexOf(searchedText.toLowerCase()) !== -1
      }
      
      return this.details.exercises.filter(e => {
        return containsText(e.code, this.searchQuery) || containsText(e.title, this.searchQuery)
      })
    }
  },
  methods: {
    ...mapActions([
      'fetchSection',
      'deleteExercise'
    ]),
    removeFromSection (exerciseId) {
      this.deleteExercise({sectionId: this.activeSection, exerciseId: exerciseId})
    }
  },
  watch: {
    activeSection (newVal) {
        if (newVal === undefined) {
            this.fetchSection(this.sectionId)
        }
    }
  }
}
</script>

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
