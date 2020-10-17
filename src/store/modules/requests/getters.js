export default {
  requests(state, _, _2, rootGetters) {
    const jobId = rootGetters.userId;
    return state.requests.filter(req => req.jobId === jobId);
  },
  hasRequests(_, getters) {
    return getters.requests && getters.requests.length > 0;
  }
};