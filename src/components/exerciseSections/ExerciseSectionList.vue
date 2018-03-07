<template>
    <ul v-if="sections && sections.length">

      <li v-for="section in sections" :key="section.id">
        
        <router-link :to="{ name: 'ExerciseSectionDetails', params: {sectionId: section.id }}">
          <p>{{ section.title }}</p>
          <img :src="section.image" />
        </router-link>
      
      </li>
  
  </ul>
</template>

<script>
import {HTTP} from '../http/api-client';

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
      console.log(response)
      this.sections = response.data
    })
  }
}
</script>

<style scoped>
  img {
    max-width: 200px;
  }
  
  li {
    border: 1px #42b983 solid;
    margin: 5px;
    padding: 5px;
  }
</style>
