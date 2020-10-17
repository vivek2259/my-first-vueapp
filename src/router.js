import { createRouter, createWebHistory } from 'vue-router';

import JobDetail from './pages/jobs/JobDetail.vue';
import JobsList from './pages/jobs/JobsList.vue';
import JobRegistation from './pages/jobs/JobRegistration.vue';
import ContactJob from './pages/requests/ContactJob.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/jobs' },
    { path: '/jobs', component: JobsList },
    {
      path: '/jobs/:id',
      component: JobDetail,
      props: true,
      children: [
        { path: 'contact', component: ContactJob } // /jobs/c1/contact
      ]
    },
    { path: '/register', component: JobRegistation, meta: { requiresAuth: true } },
    { path: '/requests', component: RequestsReceived, meta: { requiresAuth: true } },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/jobs');
  } else {
    next();
  }
});

export default router;
