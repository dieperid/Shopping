"use strict";

const UpdateCartException = require("./UpdateCartException");
const EmptyCartException = require("./EmptyCartException");

module.exports = class CartItem {
    #items;

    constructor(items) {
        this.#items = items;
    }

    add(items) {
        if (items == null || items.length <= 0) {
            throw new UpdateCartException(
                "Failed to update cart items, items can't be empty"
            );
        }
        if (this.#items) {
            this.#items.push(...items);
        } else {
            this.#items = items;
        }
    }

    get total() {
        let sum;

        if (this.#items == null || this.#items <= 0) {
            throw new EmptyCartException("Cart can't be empty");
        }

        for (let item of this.#items) {
            sum += item.quantity * item.price;
        }

        return sum;
    }

    get items() {
        if (this.#items == null || this.#items <= 0) {
            throw new EmptyCartException("Cart can't be empty");
        }
        return this.#items;
    }
};
