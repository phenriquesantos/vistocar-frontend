import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      component: () => import('./views/login.vue'),
      name: 'login',
      path: '/login',
    },
    {
      component: () => import('./views/register.vue'),
      name: 'register',
      path: '/register',
    }
  ]
})