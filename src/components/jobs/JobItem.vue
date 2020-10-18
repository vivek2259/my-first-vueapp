<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/month</h4>
    <div>
      <base-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      ></base-badge>
    </div>
    <div class="actions">
      <base-button mode="outline" link :to="jobContactLink"
        >Contact</base-button
      >
      <base-button link :to="jobDetailsLink">View Details</base-button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'firstName', 'lastName', 'rate', 'areas'],
  computed: {
    fullName() {
      return this.firstName + '@' + this.lastName;
    },
    jobContactLink() {
      return this.$route.path + '/' + this.id + '/contact'; // /jobs/c1/contact
    },
    jobDetailsLink() {
      return this.$route.path + '/' + this.id; // /jobs/c1
    },
  },
};
</script>

<style scoped>
li {
  align-items: baseline;
  position: static;
  width: 200px;
  height: 200px;
  float: left;
  margin:0;
  border: 1px #424242;
  border-radius: 12px;
  padding: .5vw;
  justify-items: center;
}

h3 {
  font-size: 12px;
}

h3,
h4 {
  font-size:10px;
  margin: 0.5rem 0;
}

div {
  font-size: 8px;
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  background-color: #bbb;
  border-radius: 5px;
  width:8vw;
  height: 4vw;
}

</style>