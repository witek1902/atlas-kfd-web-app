import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/Home';
import ExerciseSectionList from '@/components/ExerciseSectionList';
import ExerciseSectionDetails from '@/components/ExerciseSectionDetails';
import ExerciseDetails from '@/components/ExerciseDetails';
import AdminPanel from '@/components/AdminPanel';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/sections',
      name: 'ExerciseSectionList',
      component: ExerciseSectionList,
    },
    {
      path: '/sections/{sectionId}',
      name: 'ExerciseSectionDetails',
      component: ExerciseSectionDetails,
      props: true
    },
    {
      path: '/exercises/{exerciseId}',
      name: 'ExerciseDetails',
      component: ExerciseDetails,
      props: true
    },
    {
      path: '/admin',
      name: 'AdminPanel',
      component: AdminPanel,
    },
  ],
});
