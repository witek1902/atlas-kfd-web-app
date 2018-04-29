<template>
    <div v-if="sections && sections.length > 0">

    <el-row>
      <el-col :span="8" :xs="12" v-for="section in sections" :key="section.id">
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ExerciseSectionList',
  computed: {
    ...mapGetters([
      'sections'
    ])
  },
  methods: {
    ...mapActions([
      'fetchSectionList'
    ])
  },
  watch: {
    sections (newVal) {
      if(newVal === undefined) {
        this.fetchSectionList()
      }
    }
  },
  created() {
    this.fetchSectionList()
  }
}
</script>

<style scoped>
.section-title {
  font-size: 1.3em;
  font-weight: bold;
  text-decoration: none;
}

.section-title > p {
  margin: 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden !important;
}

.section-image {
  max-width: 300px;
  margin-top: 10px;
}

@media screen and (max-width: 992px) {
  .section-image {
    max-width: 200px;
    margin-top: 5px;
  }
}

@media screen and (max-width: 777px) {
  .section-image {
    max-width: 100px;
  }
}

.exercise-card {
  border: 1px #18a3d4 solid;
  margin: 5px;
  padding: 5px;
}

@media screen and (max-width: 777px) {
  .exercise-card {
    padding: 0px;
    max-height: 200px;
  }
}
</style>
