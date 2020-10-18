<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <job-filter @change-filter="setFilters"></job-filter>
    </section>
    <section>
     


        <div class="search-bar">

          <form class="search-bar" style="display: flex;justify-content:center">
            <div class="input-icons">
              <i
                class="fas fa-search"
                style="color: blue; margin: 10px"
              ></i>
              <input
                type="text" 
                placeholder="          Keyword" class="form-input"
              />
            </div>


            <div class="input-icons">
              <i
                class="fas fa-hand-holding-usd"
                style="color: blue; margin: 10px"
              ></i>
              <input
                type="number" 
                placeholder="          Salary Range" class="form-input"
              />
            </div>

            <div class="input-icons">
              <i
                class="fas fa-user-tie"
                style="color: blue; margin: 10px"
              ></i>
              <input
                type="text"
                placeholder="          Job Type"
                class="form-input"
              />
            </div>

            <div class="input-icons">
              <i  
                class="fas fa-map-marked-alt"
                style="color: blue; margin: 10px"
              ></i>
              <input
                type="text"
                placeholder="          Location"
                class="form-input"
              />
            </div>

            <div class="input-icons">
            <base-button class="local-button"> Find </base-button>
            </div>

          </form>
        </div>
        <p>                                                               </p>


        <div class="controls">
          <base-button class="local-button" @click="loadJobs(true)"
            ><i class="fas fa-sync-alt"></i></base-button
          >
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn"
            class="local-button" style="font-size:12px">Login to Register a new Job</base-button
          >
          <base-button
            v-if="isLoggedIn && !isJob && !isLoading"
            link
            to="/register"
            >Register a Job</base-button
          >
        </div>



        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasJobs">
          <job-item
            class="job_item"
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
  display: flexbox;
  justify-content: space-between;
  position: relative;
  max-width: 70vw;
  right: -28vw;
  list-style: none;
  margin-top: 0;
  padding: 0.5vw;
}
.job_item {
  padding: 0.5vw;
  background-color: white;
}
.controls {
  display: flex;
  justify-content: space-between;
}

.search-bar > * {
  height: 35px;
  border: transparent;
}

.input-icons i {
  position: absolute;
}

.input-icons {
  width: 100%;
  margin-bottom: 10px;
  border: transparent;
  border-radius: 10px;
}

.local-button{
  color: white;
  height: 35px;
  background: #0062FF;
  margin: 0;
  margin-top:1px;
  border: #0062FF;
  border-radius: 5px;
}

.form-input{
  margin-left: 0px;
   height: 35px;
    padding-left: 40px;
    border:transparent;
}



</style>
