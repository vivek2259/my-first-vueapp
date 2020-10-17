import { createStore } from 'vuex';

import jobsModule from './modules/jobs/index.js';
import requestsModule from './modules/requests/index.js';
import authModule from './modules/auth/index.js';

const store = createStore({
  modules: {
    jobs: jobsModule,
    requests: requestsModule,
    auth: authModule
  }
});

export default store;