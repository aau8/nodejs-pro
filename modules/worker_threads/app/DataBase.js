const { MessageChannel } = require("worker_threads")

class DataBase {
    constructor() {
        this.data = {
            products: [],
            users: [],
        }
        // this.products = [];
        // this.users = [];
        this.channels = [];
        this.messageChannel = null;
    }

    getPort(type) {
        if (!this.messageChannel) {
            this.messageChannel = new MessageChannel()
        }

        // const channel = {
        //     type,
        //     port2
        // }

        return this.messageChannel.port1
    }

    /**
     * Добавить товар
     */
    addProduct(name, price) {
        const product = {
            id: Date.now(),
            name,
            price,
        };

        this.data.products.push(product);
        this.messageChannel.port2.postMessage({
            action: "addProduct",
            data: product
        })
        return product;
    }

    /**
     * Получить товар
     */
    getProduct(id) {
        return this.data.products.find((product) => product.id === id);
    }

    /**
     * Удалить товар
     */
    deleteProduct(id) {
        return (this.data.products = this.data.products.filter(
            (product) => product.id !== id
        ));
    }

    /**
     * Добавить пользователя
     */
    addUser(name, old) {
        const user = {
            id: Date.now(),
            name,
            old,
        };

        this.data.users.push(user);
        this.messageChannel.port2.postMessage({
            action: "addUser",
            data: this.data
        })
        return user;
    }

    /**
     * Получить пользователя
     */
    getUser(id) {
        return this.data.users.find((user) => user.id === id);
    }

    /**
     * Удалить пользователя
     */
    deleteUser(id) {
        this.data.users = this.data.users.filter((user) => user.id !== id);
    }
}

module.exports = new DataBase();
