"use strict";

const UpdateCartException = require("./UpdateCartException");
const EmptyCartException = require("./EmptyCartException");

module.exports = class CartItem {
    #items;

    constructor(items) {
        this.#items = items;
    }

    add(items) {
        this.#items.push(items);
    }

    get total() {
        let sum;

        for (let item of this.#items) {
            sum += item.quantity * item.price;
        }

        return sum;
    }

    get items() {
        return this.#items;
    }
};
