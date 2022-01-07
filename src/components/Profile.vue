<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.data.name}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Id:</strong>
      {{currentUser.data.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.data.email}}
    </p>

    <h3 v-if="currentUser.data.is_customer === 1">
      <strong>Bill list</strong>
    </h3>

    <table v-if="currentUser.data.is_customer === 1">
      <thead>
        <th>ID</th>
        <th>Bill Month</th>
        <th>Year</th>
        <th>Amount</th>
        <th>Status</th>
        <th>Created At</th>
      </thead>

      <tbody>
        <tr v-for="(bill,index) in currentUser.data.bills" :key="index">
          <td>{{bill.id}}</td>
          <td>{{bill.bill_month}}</td>
          <td>{{bill.year}}</td>
          <td>{{bill.amount}}</td>
          <td>{{bill.status}}</td>
          <td>{{bill.created_at}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
  }
</style>
