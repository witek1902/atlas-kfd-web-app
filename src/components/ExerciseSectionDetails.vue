<template>
  <div>
      <h1>{{ details.title }}</h1>
      <div class="search">
          <el-input v-model="searchQuery" placeholder="Szukaj po kodzie lub nazwie..." />
      </div>
      <div v-if="filteredExercises && filteredExercises.length > 0">
            <div class="item" v-for="ex in filteredExercises" :key="ex.id">
                <router-link :to="{
                    name: 'ExerciseDetails',
                    params: {
                        exerciseId: ex.id 
                    }
                }">
                    <p>[{{ ex.code }}] {{ ex.title}} </p>
                    <img :src="ex.mainImageUrl" />
                </router-link>
            </div>
      </div>

      <div v-else>Brak ćwiczeń!</div>
  </div>
</template>

<script>
import {HTTP} from './ApiClient'

export default {
    name: 'ExerciseSectionDetails',
    props: {
        sectionId: Number
    },
    data () {
        return {
            searchQuery: "",
            details: {}
        }
    },
    created () {
        HTTP.get('sections/' + this.sectionId).then(response => {
            console.log(response);
            this.details = response.data;
        })
    },
    computed: {
        filteredExercises () {
            if(!this.details || !this.details.exercises)
                return;

            return this.details.exercises.filter(e => {
                let littleSearchQuery = this.searchQuery.toLowerCase();
                let inCodeExists = e.code.toLowerCase().indexOf(littleSearchQuery) !== -1;
                let inTitleExists = e.title.toLowerCase().indexOf(littleSearchQuery) !== -1;

                return inCodeExists || inTitleExists;
            })
        }
    }
}
</script>

<style scoped>
    .search {
        width: 300px;
        margin: 0 auto;
    }
    .search input {
        max-width: 90%;
    }

    .item {
        width: 30%;
        display: inline-block;
        margin: 10px;
        vertical-align: top;
    }

    .item img {
        max-width: 100%;
        max-height: 300px
    }
</style>
