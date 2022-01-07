<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/" class="navbar-brand">padma</a>
      <div class="navbar-nav mr-auto">
        <li v-if="showCustomerBoard" class="nav-item">
          <router-link to="/customer" class="nav-link">Customer Board</router-link>
        </li>
        <li v-if="currentUser && currentUser.data.is_customer === 0">
          <router-link to="/customers" class="nav-link">Customers</router-link>
        </li>
        <li v-if="currentUser && currentUser.data.is_customer === 0">
          <router-link to="/add" class="nav-link">Add Customer</router-link>
        </li>
        <li v-if="currentUser && currentUser.data.is_customer === 0">
          <router-link to="/bill/list" class="nav-link">Bill list</router-link>
        </li>
        <li v-if="currentUser && currentUser.data.is_customer === 0">
          <router-link to="/add/bill" class="nav-link">Add Bill</router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.name }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showCustomerBoard() {
      if (this.currentUser && this.currentUser['is_customer']) {
        return this.currentUser['is_customer'].includes(1);
      }

      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('login');
    },
  },
};
</script>
