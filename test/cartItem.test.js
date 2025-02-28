"use strict";

let CartItem = require("../src/CartItem/CartItem.js");
const InvalidArticleIdException = require("../src/CartItem/InvalidArticleIdException.js");
const InvalidQuantityException = require("../src/CartItem/InvalidQuantityException.js");
const InvalidPriceException = require("../src/CartItem/InvalidPriceException.js");

test("constructor_NominalCase_PropertiesGetRightValues", () => {
    //given
    let articleId = 1;
    let name = "Iphone 27";
    let quantity = 10;
    let price = 20;
    let cartItem = new CartItem(articleId, name, quantity, price);
    let total = 200;

    //when
    //we call the getters directly in assertion below

    //then
    expect(articleId).toEqual(cartItem.articleId);
    expect(articleId).toEqual(cartItem.articleId);
    expect(quantity).toEqual(cartItem.quantity);
    expect(price).toEqual(cartItem.price);
    expect(total).toEqual(cartItem.total);
});

test("constructor_InvalidArticleId_ThrowException", () => {
    //given
    let articleId = -1; //Invalid article id (smaller than 1)
    let name = "Iphone 27";
    let quantity = 10;
    let price = 20;

    //when
    expect(() => new CartItem(articleId, name, quantity, price)).toThrow(
        InvalidArticleIdException
    );

    //then
    //Exception is thrown
});

test("constructor_InvalidQuantity_ThrowException", () => {
    //given
    let articleId = 1;
    let name = "Iphone 27";
    let quantity = -10; //Invalid quantity (smaller than 1)
    let price = 20;

    //when
    expect(() => new CartItem(articleId, name, quantity, price)).toThrow(
        InvalidQuantityException
    );

    //then
    //Exception is thrown
});

test("constructor_InvalidPrice_ThrowException", () => {
    //given
    let articleId = 1;
    let name = "Iphone 27";
    let quantity = 10;
    let price = 9; //Invalid price (smaller than 10)

    //when
    expect(() => new CartItem(articleId, name, quantity, price)).toThrow(
        InvalidPriceException
    );

    //then
    //Exception is thrown
});

test("quantity_setQuantityNominalCase_QuantityValueCorrectlySet", () => {
    //given
    let articleId = 1;
    let name = "Iphone 27";
    let quantity = 10;
    let price = 20;
    let cartItem = new CartItem(articleId, name, quantity, price);
    let expectedQuantity = 15;
    let expectedTotal = 300;

    //when
    cartItem.quantity = expectedQuantity;

    //then
    expect(cartItem.quantity).toEqual(expectedQuantity);
    expect(cartItem.total).toEqual(expectedTotal);
});

test("quantity_setQuantityInvalidValue_ThrowException", () => {
    //given
    let articleId = 1;
    let name = "Iphone 27";
    let quantity = 10;
    let price = 20;
    let cartItem = new CartItem(articleId, name, quantity, price);
    let invalidQuantityToSet = -1; //Invalid quantity (smaller than 1)

    //when
    expect(() => (cartItem.quantity = invalidQuantityToSet)).toThrow(
        InvalidQuantityException
    );

    //then
    //Exception is thrown
});

test("price_setPriceNominalCase_PriceValueCorrectlySet", () => {
    //given
    let articleId = 1;
    let name = "Iphone 27";
    let quantity = 10;
    let price = 20;
    let cartItem = new CartItem(articleId, name, quantity, price);
    let expectedPrice = 22;
    let expectedTotal = 220;

    //when
    cartItem.price = expectedPrice;

    //then
    expect(cartItem.price).toEqual(expectedPrice);
    expect(cartItem.total).toEqual(expectedTotal);
});

test("price_setPriceInvalidPrice_ThrowException", () => {
    //given
    let articleId = 1;
    let name = "Iphone 27";
    let quantity = 10;
    let price = 20;
    let cartItem = new CartItem(articleId, name, quantity, price);
    let invalidPriceToSet = 9; //Invalid quantity (smaller than 10)

    //when
    expect(() => (cartItem.price = invalidPriceToSet)).toThrow(
        InvalidPriceException
    );

    //then
    //Exception is thrown
});
