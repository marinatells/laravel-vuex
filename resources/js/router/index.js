import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/HomeView.vue";
import Store from "../views/Store.vue";
import Admin from "../views/AdminView.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/store",
        name: "Store",
        component: Store,
    },

    {
        path: "/admin",
        name: "Admin",
        component: Admin,
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
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
