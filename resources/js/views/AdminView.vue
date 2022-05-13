<template>
    <div class="container mt-5">
        <h1>Список книг нашей библиотеки</h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Название</th>
                    <th scope="col">Автор</th>
                    <th scope="col">Наличие</th>
                    <th scope="col">Действия</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(book, index) in booksArr" :key="book.name">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ book["title"] }}</td>
                    <td>{{ book["author"] }}</td>
                    <td>
                        <button
                            v-if="book['availability']"
                            type="button"
                            class="btn btn-outline-primary"
                            v-on:click="changeBookAvailability(book['id'])"
                        >
                            Доступна
                        </button>
                        <button
                            v-else
                            type="button"
                            class="btn btn-outline-primary"
                            v-on:click="changeBookAvailability(book['id'])"
                        >
                            Выдана
                        </button>
                    </td>
                    <td>
                        <button
                            type="button"
                            class="btn btn-outline-danger"
                            v-on:click="deleteBook(book['id'])"
                        >
                            Удалить
                        </button>
                    </td>
                </tr>

                <!-- Строка с полями для добавления новой книги -->
                <tr>
                    <th scope="row">Добавить</th>
                    <td>
                        <input
                            type="text"
                            class="form-control"
                            v-model="form.title"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            class="form-control"
                            v-model="form.author"
                        />
                    </td>
                    <td></td>
                    <td>
                        <button
                            type="button"
                            class="btn btn-outline-success"
                            v-on:click="addBook()"
                        >
                            Добавить
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="error" v-if="notAuthorized">
            <div class="error__popup">НЕ ДОСТАТОЧНО ПРАВ</div>
        </div>
    </div>
</template>

<style scoped>
.error {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.error__popup {
    min-width: 500px;
    min-height: 200px;
    border-radius: 4px;
    background-color: rgba(255, 192, 203, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
}
</style>

<script>
export default {
    data() {
        return {
            form: {
                title: "",
                author: "",
            },
            notAuthorized: false,
        };
    },
    computed: {
        booksArr() {
            return this.$store.state.books;
        },
    },
    methods: {
        showError() {
            this.notAuthorized = true;
            setTimeout(() => {
                this.notAuthorized = false;
            }, 1000);
        },
        loadBookList() {
            this.$store.dispatch("getAll");
        },
        addBook() {
            this.$store
                .dispatch("add", {
                    title: this.form.title,
                    author: this.form.author,
                })
                .then((isOk) => {
                    if (!isOk) {
                        this.showError();
                    }
                });
        },
        deleteBook(id) {
            this.$store.dispatch("delete", { id }).then((isOk) => {
                if (!isOk) {
                    this.showError();
                }
            });
        },
        changeBookAvailability(id) {
            this.$store.dispatch("changeAvailability", { id });
        },
    },
    mounted() {
        this.loadBookList();
    },
};
</script>
