<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <job-filter @change-filter="setFilters"></job-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadJobs(true)">Refresh</base-button>
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Login to Register a new Job</base-button>
          <base-button v-if="isLoggedIn && !isJob && !isLoading" link to="/register">Register a Job</base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasJobs">
          <job-item
            v-for="job in filteredJobs"
            :key="job.id"
            :id="job.id"
            :first-name="job.firstName"
            :last-name="job.lastName"
            :rate="job.monthlyRate"
            :areas="job.areas"
          ></job-item>
        </ul>
        <h3 v-else>No jobs found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import JobItem from '../../components/jobs/JobItem.vue';
import JobFilter from '../../components/jobs/JobFilter.vue';

export default {
  components: {
    JobItem,
    JobFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        vuejs: true,
      },
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    isJob() {
      return this.$store.getters['jobs/isJob'];
    },
    filteredJobs() {
      const jobs = this.$store.getters['jobs/jobs'];
      return jobs.filter((job) => {
        if (this.activeFilters.frontend && job.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && job.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.vuejs && job.areas.includes('vuejs')) {
          return true;
        }
        return false;
      });
    },
    hasJobs() {
      return !this.isLoading && this.$store.getters['jobs/hasJobs'];
    },
  },
  created() {
    this.loadJobs();
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadJobs(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('jobs/loadJobs', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>