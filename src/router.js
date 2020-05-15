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
      component: () => import('./views/admin/home.vue'),
      name: 'admin',
      path: '/admin'
    },
    {
      component: () => import('./views/admin/report/form.vue'),
      name: 'admin-report-form',
      path: '/admin/report/new'
    },
    {
      component: () => import('./views/admin/client/list.vue'),
      name: 'admin-client-list',
      path: '/admin/client/list'
    },
    {
      component: () => import('./views/admin/client/form.vue'),
      name: 'admin-client-form-new',
      path: '/admin/client/new'
    },
    {
      component: () => import('./views/admin/client/form.vue'),
      name: 'admin-client-form-edit',
      path: '/admin/client/edit/:id'
    },
    {
      component: () => import('./views/admin/client/delete.vue'),
      name: 'admin-client-delet',
      path: '/admin/client/delete/:id'
    },
    {
      component: () => import('./views/admin/user/list.vue'),
      name: 'admin-user-list',
      path: '/admin/user/list'
    },
    {
      component: () => import('./views/admin/user/form.vue'),
      name: 'admin-user-form-new',
      path: '/admin/user/new'
    },
    {
      component: () => import('./views/admin/user/form.vue'),
      name: 'admin-user-form-edit',
      path: '/admin/user/edit/:id'
    },
    {
      component: () => import('./views/admin/user/delete.vue'),
      name: 'admin-user-delet',
      path: '/admin/user/delete/:id'
    },
    {
      component: () => import('./views/admin/scheduling/list.vue'),
      name: 'admin-scheduling-list',
      path: '/admin/scheduling/list'
    },
    {
      component: () => import('./views/admin/scheduling/form.vue'),
      name: 'admin-scheduling-form-new',
      path: '/admin/scheduling/new'
    },
    {
      component: () => import('./views/admin/scheduling/form.vue'),
      name: 'admin-scheduling-form-edit',
      path: '/admin/scheduling/edit/:id'
    },
    {
      component: () => import('./views/admin/scheduling/delete.vue'),
      name: 'admin-scheduling-delet',
      path: '/admin/scheduling/delete/:id'
    }
  ]
})
