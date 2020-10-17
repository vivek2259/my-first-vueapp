export default {
  async contactJob(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message
    };
    const response = await fetch(
      `https://vivek2259auth.firebaseio.com/requests/${payload.jobId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest)
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to send request.'
      );
      throw error;
    }

    newRequest.id = responseData.name;
    newRequest.jobId = payload.jobId;

    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context) {
    const jobId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://vivek2259auth.firebaseio.com/requests/${jobId}.json?auth=` +
        token
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch requests.'
      );
      throw error;
    }

    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        jobId: jobId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      };
      requests.push(request);
    }

    context.commit('setRequests', requests);
  }
};
