import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        books: [],
        token: localStorage.getItem("token"),
    },
    mutations: {
        setToken(state, payload) {
            state.token = payload.token;
            localStorage.setItem("token", payload.token);
        },
    },
    actions: {
        getToken(store, payload) {
            return axios
                .post("api/token", {
                    email: payload.email,
                    password: payload.password,
                    device_name: navigator.userAgent,
                })
                .then((response) => {
                    store.commit("setToken", { token: response.data });
                });
        },

        checkToken(store) {
            const token = store.state.token;

            if (!token) {
                return false;
            }

            return axios
                .get("/api/check-token", {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .then(() => {
                    return true;
                })
                .catch(() => {
                    return false;
                });
        },

        getAll(store) {
            axios.get("api/book/all").then((response) => {
                store.state.books = response.data;
            });
        },

        changeAvailability(store, payload) {
            axios
                .post("api/book/change_availabilty/" + payload.id)
                .then((response) => {
                    const book = store.state.books.find(
                        (item) => item.id === payload.id
                    );
                    book.availability = !book.availability;
                });
        },

        delete(store, payload) {
            axios.post("api/book/delete/" + payload.id).then((response) => {
                store.state.books = store.state.books.filter(
                    (item) => item.id != payload.id
                );
            });
        },

        add(store, payload) {
            axios
                .post(
                    "api/book/add",
                    {
                        title: payload.title,
                        author: payload.author,
                    },
                    {
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("token"),
                        },
                    }
                )
                .then((response) => {
                    store.state.books.push(response.data);
                });
        },
    },
});
