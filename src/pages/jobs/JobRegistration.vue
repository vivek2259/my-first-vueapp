<template>
  <section>
    <base-card>
      <h2>Register a job here!</h2>
      <job-form @save-data="saveData"></job-form>
    </base-card>
  </section>
</template>

<script>
import JobForm from '../../components/jobs/JobForm.vue';

export default {
  components: {
    JobForm,
  },
  methods: {
    saveData(data) {
      this.$store.dispatch('jobs/registerJob', data);
      this.$router.replace('/jobs');
    }
  }
};
</script>