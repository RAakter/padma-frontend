<template>
  <div v-if="currentBill" class="edit-form">
    <h4>Bill</h4>
    <form>
      <div class="form-group">
        <label>Select Status</label>
        <select name="status" v-model="currentBill.status" class="form-control" id="status" required>
          <option :value="due">due</option>
          <option :value="paid">paid</option>
        </select>
      </div>
    </form>

    <button type="submit"
      @click="updateBill"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Bill</p>
  </div>
</template>

<script>
import BillDataService from "../services/BillDataService";

export default {
  name: "bill",
  data() {
    return {
      currentBill: null,
      message: ''
    };
  },
  methods: {
    getBill(id) {
      BillDataService.get(id)
        .then(response => {
          this.currentBill = response.data.data;
          console.log(response.data.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateBill() {
      BillDataService.update(this.currentBill.id, this.currentBill)
        .then(response => {
          console.log(response.data.data);
          this.message = 'The bill was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = '';
    this.getBill(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
