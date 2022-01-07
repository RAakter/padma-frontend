<template>
    <div class="list row">
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search by status"
                       v-model="status"/>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button"
                            @click="searchStatus"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <h4>Bill List</h4>
            <ul class="list-group">
                <li class="list-group-item"
                    :class="{ active: index == currentIndex }"
                    v-for="(bill, index) in bills"
                    :key="index"
                    @click="setActiveBill(bill, index)"
                >
                    {{ bill.customer_id }}
                </li>
            </ul>
        </div>
        <div class="col-md-6">
            <div v-if="currentBill">
                <h4>Bill</h4>
                <div>
                    <label><strong>Customer:</strong></label> {{ currentBill.customer_id }}
                </div>
                <div>
                    <label><strong>Bill Month:</strong></label> {{ currentBill.bill_month }}
                </div>
                <div>
                    <label><strong>Year:</strong></label> {{ currentBill.year }}
                </div>
                <div>
                    <label><strong>Amount:</strong></label> {{ currentBill.amount }}
                </div>
                <div>
                    <label><strong>Status:</strong></label> {{ currentBill.status }}
                </div>
                <router-link :to="'/bills/' + currentBill.id" class="badge badge-warning">Edit</router-link>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Bill...</p>
            </div>
        </div>
    </div>
</template>

<script>
    import BillDataService from "../services/BillDataService";

    export default {
        name: "bill-list",
        data() {
            return {
                bills: [],
                currentBill: null,
                currentIndex: -1,
                name: ""
            };
        },
        methods: {
            retrieveBills() {
                BillDataService.getAll()
                    .then(response => {
                        this.bills = response.data.data;
                        console.log(response.data.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

            refreshList() {
                this.retrieveBills();
                this.currentBill = null;
                this.currentIndex = -1;
            },

            setActiveBill(bill, index) {
                this.currentBill = bill;
                this.currentIndex = bill ? index : -1;
            },


        },
        searchStatus() {
            BillDataService.findByStatus(this.title)
                .then(response => {
                    this.bills = response.data.data;
                    this.setActiveBill(null);
                    console.log(response.data.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        mounted() {
            this.retrieveBills();
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
