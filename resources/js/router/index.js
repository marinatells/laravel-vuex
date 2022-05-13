import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/HomeView.vue";
import Store from "../views/Store.vue";
import Admin from "../views/AdminView.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

import store from "../store";
Vue.use(VueRouter);

// редирект между админской и главной
function checkAdmin(to, from, next) {
    store.dispatch("checkAuth").then((result) => {
        result ? next("/admin") : next("/");
    });
}

// редирект на главную, если залогинен
function checkNotAuth(to, from, next) {
    store.dispatch("checkAuth").then((result) => {
        result ? next("/") : next();
    });
}

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        // если на главный экран пришел залогиненный юзер,
        // то отправляем на на страницу админа
        beforeEnter: (to, from, next) => {
            store.dispatch("checkAuth").then((result) => {
                result ? next("/admin") : next();
            });
        },
    },
    {
        path: "/admin",
        name: "Admin",
        component: Admin,
        // если на экран логина пришел не залогиненный юзер,
        // то отправляем на на главный экран
        beforeEnter: (to, from, next) => {
            store.dispatch("checkAuth").then((result) => {
                result ? next() : next("/");
            });
        },
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        beforeEnter: checkNotAuth,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        beforeEnter: checkNotAuth,
    },
    {
        path: "/store",
        name: "Store",
        component: Store,
    },
    {
        path: "*",
        redirect: "/",
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
