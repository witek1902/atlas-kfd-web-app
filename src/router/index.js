import Vue from 'vue';
import Router from 'vue-router';

import ExerciseSectionList from '@/components/exerciseSections/ExerciseSectionList';
import ExerciseSectionDetails from '@/components/exerciseSections/ExerciseSectionDetails';
import ExerciseDetails from '@/components/exercises/ExerciseDetails';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ExerciseSectionList',
      component: ExerciseSectionList
    },
    {
      path: '/exerciseSections/:sectionId',
      name: 'ExerciseSectionDetails',
      component: ExerciseSectionDetails,
      props: true
    },
    {
      path: '/exercises/:exerciseId',
      name: 'ExerciseDetails',
      component: ExerciseDetails,
      props: true
    }
  ]
});
