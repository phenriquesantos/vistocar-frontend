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
      component: () => import('./views/scheduling.vue'),
      name: 'scheduling',
      path: '/scheduling',
    },
    {
      component: () => import('./views/register.vue'),
      name: 'register',
      path: '/register',
    },
    {
      component: () => import('./views/admin/client/list.vue'),
      name: 'admin-client-list',
      path: '/admin/client/list'
    }
  ]
})