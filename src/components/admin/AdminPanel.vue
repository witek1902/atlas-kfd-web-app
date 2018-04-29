<template>
  <div class="form-container">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Add new section</span>
      </div>
      <el-form ref="newSection" :model="newSectionForm" :inline="true">
          <el-input class="kfd-input" placeholder="Title..." v-model="newSectionForm.title"></el-input>
          <el-input class="kfd-input" placeholder="Image URL..." v-model="newSectionForm.image"></el-input>
          <el-button type="primary" @click="onSubmitNewSection">Create</el-button>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Add new exercise to section</span>
      </div>
      <el-form ref="addExerciseToSection" :model="addExerciseToSectionForm" :inline="true">
          <el-select
              v-model="addExerciseToSectionForm.exerciseSectionId"
              filterable
              clearable 
              placeholder="Exercise section...">
                  <el-option
                      v-for="section in sections"
                      :key="section.id"
                      :label="section.title"
                      :value="section.id">
                  </el-option>
          </el-select>
          <el-select
              v-model="addExerciseToSectionForm.exerciseId"
              filterable
              clearable 
              placeholder="Exercise...">
                  <el-option
                      v-for="exercise in exercises"
                      :key="exercise.id"
                      :label="exercise.title"
                      :value="exercise.id">
                  </el-option>
          </el-select>
          <el-button type="primary" @click="onSubmitAddExercise">Add exercise to section</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'
import { BUS } from '../../bus/EventBus'
export default {
  name: 'AdminPanel',
  data() {
    return {
      loadingSections: false,
      newSectionForm: {
        title: '',
        image: ''
      },
      addExerciseToSectionForm: {
        exerciseId: '',
        exerciseSectionId: ''
      }
    }
  },
  created () {
    this.fetchSectionList()
    this.fetchExerciseList()
    BUS.$on('clean-add-exercise-form', e => {
      this.addExerciseToSectionForm.exerciseId = ''
      this.addExerciseToSectionForm.exerciseSectionId = ''
    })
    BUS.$on('clean-add-section-form', e => {
      this.newSectionForm.title = ''
      this.newSectionForm.image = ''
    })
  },
  computed: {
    ...mapGetters([
      'sections',
      'exercises'
    ])
  },
  methods: {
    ...mapActions([
      'fetchSectionList',
      'fetchExerciseList',
      'addExerciseToSection',
      'addSection'
    ]),
    onSubmitNewSection() {
      this.addSection(this.newSectionForm)
    },
    onSubmitAddExercise() {
      this.addExerciseToSection(this.addExerciseToSectionForm)
    }
  }
}
</script>

<style scoped>
.form-container {
  width: 80%;
  margin: 0 auto;
}

.kfd-input {
  margin-bottom: 20px;
  width: 300px;
}

.box-card {
  margin-bottom: 20px;
}
</style>
