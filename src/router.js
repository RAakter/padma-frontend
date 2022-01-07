import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
const Profile = () => import("./components/Profile.vue")
const BoardCustomer = () => import("./components/BoardCustomer.vue")
const BoardUser = () => import("./components/BoardUser.vue")

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/bills",
    name: "bills",
    component: Profile,
  },
  {
    path: "/customer",
    name: "customer",
    component: BoardCustomer,
  },
  {
    path: "/user",
    name: "user",
    component: BoardUser,
  },
  {
    path: "/",
    alias: "/customers",
    name: "customers",
    component: () => import("./components/CustomerList")
  },
  {
    path: "/customers/:id",
    name: "customer-details",
    component: () => import("./components/EditCustomer")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddCustomer")
  },
  {
    path: "/add/bill",
    name: "add-bill",
    component: () => import("./components/AddBill")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
