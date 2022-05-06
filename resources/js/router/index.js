import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/HomeView.vue";
import Store from "../views/Store.vue";
import Admin from "../views/AdminView.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import axios from "axios";

import store from "../store";
Vue.use(VueRouter);

function check(to, from, next) {
    store.dispatch("checkToken").then((result) => {
        result ? next() : next("/login");
    });
}

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        beforeEnter: check,
    },
    {
        path: "/admin",
        name: "Admin",
        component: Admin,
        beforeEnter: check,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/store",
        name: "Store",
        component: Store,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
