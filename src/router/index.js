import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';

import ExerciseSectionList from '@/components/exerciseSections/ExerciseSectionList';
import ExerciseSectionDetails from '@/components/exerciseSections/ExerciseSectionDetails';
import ExerciseDetails from '@/components/exercises/ExerciseDetails';
import AdminPanel from '@/components/admin/AdminPanel';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/exerciseSections',
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
    },
    {
      path: '/admin',
      name: 'AdminPanel',
      component: AdminPanel
    }
  ]
});
