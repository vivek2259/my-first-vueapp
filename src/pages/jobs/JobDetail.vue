<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/month</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button v-once link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedJob: null,
    };
  },
  computed: {
    fullName() {
      return this.selectedJob.firstName + ' ' + this.selectedJob.lastName;
    },
    areas() {
      return this.selectedJob.areas;
    },
    rate() {
      return this.selectedJob.monthlyRate;
    },
    description() {
      return this.selectedJob.description;
    },
    contactLink() {
      return this.$route.path+'/contact'; //+ '/' + this.selectedJob.id + '/contact';
      
    },
  },
  created() {
    this.selectedJob = this.$store.getters['jobs/jobs'].find(
      (job) => job.id === this.id
    );
  },
};
</script>