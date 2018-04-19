<template>
    <div>
        <ul>
            <li class="section-container" v-for="section in sections" :key="section.id">
                <router-link :to="{ 
                        name: 'ExerciseSectionDetails', 
                        params: { sectionId: section.id }
                }">
                    <p> {{ section.title }}</p>
                    <img :src="section.image" />
                </router-link>
            </li> 
        </ul>
    </div>
</template>

<script>
import {HTTP} from './ApiClient'

export default {
  name: 'ExerciseSectionList',
  data () {
      return {
          sections: []
      }
  },
  created () {
      HTTP.get('sections').then(response => {
          this.sections = response.data;
      })
  }
}
</script>

<style scoped>
    .section-container {
        width: 30%;
        border: 1px solid black;
        padding: 10px;
        margin-bottom: 10px;
    }

    .section-container img {
        max-width: 100%;
    }
</style>