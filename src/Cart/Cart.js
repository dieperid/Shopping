"use strict";

const UpdateCartException = require("./UpdateCartException");
const EmptyCartException = require("./EmptyCartException");

module.exports = class CartItem {
    #items;

    constructor(items) {
        this.#items = items;
    }

    checkEmptyCart() {
        if (this.#items == null || this.#items <= 0) {
            throw new EmptyCartException("Cart can't be empty");
        }
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

    count(value) {
        this.checkEmptyCart();

        if (value) {
            // Return the number of CartItem
            return this.#items.length;
        }

        // Return the sum of quantity of CartItem
        return this.#items.reduce(
            (totalQuantity, item) => totalQuantity + item.quantity,
            0
        );
    }

    get total() {
        this.checkEmptyCart();
        return this.#items.reduce(
            (sum, item) => sum + item.quantity * item.price,
            0
        );
    }

    get items() {
        this.checkEmptyCart();
        return this.#items;
    }
};
