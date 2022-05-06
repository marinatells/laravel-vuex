<template>
    <div class="store-test">
        <div>{{ count }}</div>
        <button @click="up">up</button>
        <button @click="up2">up 2</button>
        <button @click="up3">up in 2 sec</button>
    </div>
</template>

<script>
export default {
    computed: {
        count() {
            return this.$store.state.count;
        },
    },
    methods: {
        up() {
            this.$store.commit("increment");
        },
        up2() {
            this.$store.commit("increment", 2);
        },
        up3() {
            this.$store.dispatch("incrementAsync", 10);
        },
    },
};
</script>
<style>
.store-test {
    height: 80vh;
    width: 80vh;
    text-align: center;
}
</style>
