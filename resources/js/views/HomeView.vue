<template>
    <div id="app">
        <div class="container mt-5">
            <h1>Список книг нашей библиотеки</h1>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Название</th>
                        <th scope="col">Автор</th>
                        <th scope="col">Наличие</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(book, index) in booksArr" :key="book.name">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ book["title"] }}</td>
                        <td>{{ book["author"] }}</td>
                        <td>
                            <p
                                v-if="book['availability']"
                                type="button"
                                class=""
                            >
                                Доступна
                            </p>
                            <p v-else type="button" class="">Выдана</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped></style>
<script>
export default {
    data() {
        return {
            token: null,
        };
    },
    computed: {
        booksArr() {
            return this.$store.state.books;
        },
    },
    methods: {
        loadBookList() {
            this.$store.dispatch("getAll");
        },
    },
    mounted() {
        this.loadBookList();
    },
};
</script>
