<template>
  <div class="list row">
    <div class="col-md-8">
    </div>
    <div class="col-md-6">
      <h4>Customer List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(customer, index) in customers"
          :key="index"
          @click="setActiveCustomer(customer, index)"
        >
          {{ customer.name }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllCustomers">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentCustomer">
        <h4>Customer</h4>
        <div>
          <label><strong>Name:</strong></label> {{ currentCustomer.name }}
        </div>
        <div>
          <label><strong>Email:</strong></label> {{ currentCustomer.email }}
        </div>
        <div>
          <label><strong>Address:</strong></label> {{ currentCustomer.address }}
        </div>
        <router-link :to="'/customers/' + currentCustomer.id" class="badge badge-warning">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Customer...</p>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerDataService from "../services/CustomerDataService";

export default {
  name: "customers-list",
  data() {
    return {
      customers: [],
      currentCustomer: null,
      currentIndex: -1,
      name: ""
    };
  },
  methods: {
    retrieveCustomers() {
      CustomerDataService.getAll()
        .then(response => {
          this.customers = response.data.data;
          console.log(response.data.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveCustomers();
      this.currentCustomer = null;
      this.currentIndex = -1;
    },

    setActiveCustomer(customer, index) {
      this.currentCustomer = customer;
      this.currentIndex = customer ? index : -1;
    },

    removeAllCustomers() {
      CustomerDataService.deleteAll()
        .then(response => {
          console.log(response.data.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
  
  },
  mounted() {
    this.retrieveCustomers();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.show-image{
        height: 200px;
        width: 200px;
    }
</style>