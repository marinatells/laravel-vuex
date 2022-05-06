import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 0,
    },
    mutations: {
        increment(state, count = 1) {
            state.count += count;
        },
    },
    getters: {
        double: (state) => {
            return state.count * 2;
        },
    },
    actions: {
        incrementAsync: (store, count) => {
            setTimeout(() => {
                store.commit("increment", count);
            }, 2000);
        },
    },
});
