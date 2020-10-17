export default {
  jobs(state) {
    return state.jobs;
  },
  hasJobs(state) {
    return state.jobs && state.jobs.length > 0;
  },
  isJob(_, getters, _2, rootGetters) {
    const jobs = getters.jobs;
    const userId = rootGetters.userId;
    return jobs.some(job => job.id === userId);
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();
    return (currentTimeStamp - lastFetch) / 1000 > 60;
  }
};