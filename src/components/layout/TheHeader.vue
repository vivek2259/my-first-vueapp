<template>
  <header>
    <nav>
      <h1>
        
        <router-link to="/">
        <span style="font-size: 1.2em; color: #0062ff">
          <i class="fab fa-creative-commons-sampling"></i>
        </span>
         Milao
        </router-link>
      </h1>
      <ul>
        <li>
          <router-link to="/jobs" >All Jobs</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/requests">Requests</router-link>
        </li>
        <li v-else>
          <router-link to="/auth">Login</router-link>
        </li>
        <li v-if="isLoggedIn">
          <base-button @click="logout">Logout</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/jobs');
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 3rem;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration-style: solid;
  color:black;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover
{
  height: 35px;
  color:#bbb;
  margin: 0;
  margin-top:1px;
  border: transparent;

}
a.router-link-active {
 color:white;
  height: 35px;
  background: #0062FF;
  margin: 0;
  margin-top:1px;
  border: transparent;


}

h1 {
  margin: 0;
}

h1 a {
  color: black;
  font-size: 0.8em;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  height:fit-content;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  font-size: 0.8rem;
  margin-top: 0rem;
}
</style>