export default {
  registerJob(state, payload) {
    state.jobs.push(payload);
  },
  setJobs(state, payload) {
    state.jobs = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  }
};