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
import { HTTP } from "../http/ApiClient";

export default {
  name: "AdminPanel",
  data() {
    return {
      loadingSections: false,
      sections: [],
      exercises: [],
      newSectionForm: {
        title: "",
        image: ""
      },
      addExerciseToSectionForm: {
        exerciseId: "",
        exerciseSectionId: ""
      }
    };
  },
  created() {
    HTTP.get("sections").then(response => {
      this.sections = response.data;
    });
    HTTP.get("exercises").then(response => {
      this.exercises = response.data;
    });
  },
  methods: {
    onSubmitNewSection() {
      HTTP.post("sections", {
        title: this.newSectionForm.title,
        image: this.newSectionForm.image
      }).then(response => {
        this.newSectionForm.title = "";
        this.newSectionForm.image = "";

        this.$notify({
          title: "Success",
          message: "Saving new Section successfully!",
          type: "success"
        });
      });
    },
    onSubmitAddExercise() {
      HTTP.post(
        "sections/" +
          this.addExerciseToSectionForm.exerciseSectionId +
          "/exercises",
        {
          exerciseId: this.addExerciseToSectionForm.exerciseId
        }
      )
      .then(response => {
        this.addExerciseToSectionForm.exerciseId = "";
        this.addExerciseToSectionForm.exerciseSectionId = "";

        this.$notify({
          title: "Success",
          message: "Adding new Exercise to Section successfully!",
          type: "success"
        });
      })
      .catch(error => {
        this.$notify({
          title: "Validation error",
          message: error.response.data,
          type: "error"
        });
      });
    }
  }
};
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