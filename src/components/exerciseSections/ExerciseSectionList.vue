<template>
    <div v-if="sections && sections.length">

    <el-row>
      <el-col :span="8" v-for="section in sections" :key="section.id">
        <el-card class="exercise-card">
          <router-link class="section-title" :to="{ name: 'ExerciseSectionDetails', params: {sectionId: section.id }}">
            <p>{{ section.title }}</p>
            <img class="section-image" :src="section.image" />
          </router-link>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import {HTTP} from '../http/ApiClient';

export default {
  name: 'ExerciseSectionList',
  data () {
    return {
      sections: []
    }
  },
  created() {
    HTTP.get('sections')
    .then(response => {
      this.sections = response.data
    })
  }
}
</script>

<style scoped>
.section-title {
  font-size: 1.3em;
  font-weight: bold;
  text-decoration: none;
}

.section-image {
  max-width: 300px;
}

.exercise-card {
  border: 1px #18a3d4 solid;
  margin: 5px;
  padding: 5px;
}
</style>
