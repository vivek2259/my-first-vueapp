<template>
  <base-card>
    <div class="side-bar">
      <h2 style="font-size:15px">Find Jobs</h2>
      <ul class="filter-option">
        <input type="checkbox" id="frontend" checked @change="setFilter" />
        <label for="frontend">Frontend</label>
      </ul>
      <ul class="filter-option">
        <input type="checkbox" id="backend" checked @change="setFilter" />
        <label for="backend">Backend</label>
      </ul>
      <ul class="filter-option">
        <input type="checkbox" id="vuejs" checked @change="setFilter" />
        <label for="vuejs">Vuejs</label>
      </ul>
    </div>
  </base-card>
</template>

<script>
export default {
  emits: ['change-filter'],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        vuejs: true,
      },
    };
  },
  methods: {
    setFilter(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive,
      };
      this.filters = updatedFilters;
      this.$emit('change-filter', updatedFilters);
    },
  },
};
</script>

<style scoped>
h2 {
  font-size: 20px;
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}

.side-bar {
  font-size:12px;
  margin-top: 15vh;
  margin-left: 5vw;
  float: left;
  background-color:transparent;
}
</style>