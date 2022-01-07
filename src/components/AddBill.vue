<template>
<h3>Add Bill</h3>
  <div>
    <div v-if="!submitted">
      <div class="form-group">
        <label>Select Customer</label>
        <select name="customer_id" v-model="bill.customer_id" class="form-control" id="customer_id" required>
          <option value="">Select Customer</option>
          <option v-for="cus in customerlist" :key="cus.id"
                  :value="cus.id">
            {{ cus.name }}
          </option>
        </select>
      </div>

      <div>
        <label for="bill_month">Billing Month</label>
        <input
          class="form-control"
          type="text"
          id="bill_month"
          required
          v-model="bill.bill_month"
          name="bill_month"
        />
      </div>

      <div>
        <label for="year">Year</label>
        <input
          type="text"
          class="form-control"
          id="year"
          required
          v-model="bill.year"
          name="year"
        />
      </div>

       <div class="form-group">
        <label for="amount">Amount</label>
        <input
          type="number"
          class="form-control"
          id="amount"
          required
          v-model="bill.amount"
          name="amount"
        />
      </div>

      <div class="form-group">
        <label>Select Status</label>
        <select name="status" v-model="bill.status" class="form-control" id="status" required>
          <option :value="due">due</option>
          <option :value="paid">paid</option>
        </select>
      </div>

      <button @click="saveBill" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>Bill saved successfully!</h4>
      <button class="btn btn-success" @click="newBill">Add</button>
    </div>
  </div>
</template>

<script>
import BillDataService from "../services/BillDataService";
import UserService from "../services/user.service";

export default {
  name: "add-bill",
  data() {
    return {
      bill: {
        id: null,
        customer_id: "",
        bill_month: "",
        year: "",
        amount: "",
        status: "",

      },
      customerlist : [],
      submitted: false
    };
  },
  mounted() {
    UserService.getPublicContent().then(
            (response) => {
              this.customerlist = response.data.data;
            },
            (error) => {
              this.customerlist =
                      (error.response &&
                              error.response.data &&
                              error.response.data.message) ||
                      error.message ||
                      error.toString();
            }
    );
  },
  methods: {
    saveBill() {
      var data = {
        customer_id: this.bill.customer_id,
        bill_month: this.bill.bill_month,
        year: this.bill.year,
        amount: this.bill.amount,
        status: this.bill.status,
      };

      BillDataService.create(data)
        .then(response => {
          this.bill.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

    newBill() {
      this.submitted = false;
      this.bill = {};
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
