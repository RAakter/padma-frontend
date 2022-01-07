<template>
<h3>Add Customer</h3>
  <div>
    <div v-if="!submitted">
      <div>
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="customer.name"
          name="name"
        />
      </div>

      <div>
        <label for="email">Email</label>
        <input
          class="form-control"
          type="email"
          id="email"
          required
          v-model="customer.email"
          name="email"
        />
      </div>

      <div>
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          required
          v-model="customer.password"
          name="password"
        />
      </div>

       <div class="form-group">
        <label for="address">Address</label>
        <input
          type="text"
          class="form-control"
          id="address"
          required
          v-model="customer.address"
          name="address"
        />
      </div>

      <button @click="saveCustomer" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>Customer saved successfully!</h4>
      <button class="btn btn-success" @click="newCustomer">Add</button>
    </div>
  </div>
</template>

<script>
import CustomerDataService from "../services/CustomerDataService";

export default {
  name: "add-customer",
  data() {
    return {
      customer: {
        id: null,
        name: "",
        email: "",
        password: "",
        address: "",

      },
      submitted: false
    };
  },
  methods: {
    saveCustomer() {
      var data = {
        name: this.customer.name,
        email: this.customer.email,
        password: this.customer.password,
        address: this.customer.address,
      };

      CustomerDataService.create(data)
        .then(response => {
          this.customer.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

    newCustomer() {
      this.submitted = false;
      this.customer = {};
    }
  }
};
</script>

<style scoped>

input[type=submit] {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
