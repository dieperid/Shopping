"use strict";

const InvalidArticleIdException = require("./InvalidArticleIdException.js");
const InvalidQuantityException = require("./InvalidQuantityException.js");
const InvalidPriceException = require("./InvalidPriceException.js");

module.exports = class CartItem {
    //region private attributes
    articleId;
    name;
    quantity;
    price;
    //endregion private attributes

    //region public methods
    constructor(articleId, name, quantity, price) {
        this.articleId = articleId;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }

    get articleId() {
        throw new Error();
    }

    get name() {
        throw new Error();
    }

    get quantity() {
        throw new Error();
    }

    set quantity(value) {
        throw new Error();
    }

    get price() {
        throw new Error();
    }

    set price(value) {
        throw new Error();
    }

    get total() {
        return this.quantity * this.price;
    }
    //endregion public methods

    //region private methods
    //endregion private methods
};
