export default {
  async registerJob(context, data) {
    const userId = context.rootGetters.userId;
    const jobData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      monthlyRate: data.rate,
      areas: data.areas
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://vivek2259auth.firebaseio.com/jobs/${userId}.json?auth=` +
        token,
      {
        method: 'PUT',
        body: JSON.stringify(jobData)
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // error ...
    }

    context.commit('registerJob', {
      ...jobData,
      id: userId
    });
  },
  async loadJobs(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(
      `https://vivek2259auth.firebaseio.com/jobs.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const jobs = [];

    for (const key in responseData) {
      const job = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        monthlyRate: responseData[key].monthlyRate,
        areas: responseData[key].areas
      };
      jobs.push(job);
    }

    context.commit('setJobs', jobs);
    context.commit('setFetchTimestamp');
  }
};
