"use strict";
let Cart = require("../src/Cart/Cart.js");
const EmptyCartException = require("../src/Cart/EmptyCartException");
const UpdateCartException = require("../src/Cart/UpdateCartException");

//Exception mocked
class ShoppingException extends Error {}
class CartException extends ShoppingException {}
class InvalidQuantityException extends CartException {}

const CartItem = jest
    .fn()
    .mockImplementation((articleId, name, quantity, price) => {
        return {
            articleId,
            name,
            quantity,
            price,
            get total() {},
            updateQuantity: jest.fn().mockImplementation((newQuantity) => {
                if (newQuantity < 1) throw new InvalidQuantityException();
                quantity = newQuantity;
            }),
        };
    });

test("items_NominalCase_GetItems", () => {
    //given
    let cartItem1 = new CartItem(1, "Iphone 27", 1, 10);
    let cartItem2 = new CartItem(2, "Iphone 28", 2, 20);
    let expectedItems = [cartItem1, cartItem2];
    let cart = new Cart(expectedItems);

    //when
    let actualItems = cart.items;

    //then
    for (let i = 0; i <= expectedItems.length; i++) {
        expect(actualItems[i]).toEqual(expectedItems[i]);
    }
});

test("items_EmptyCart_ThrowException", () => {
    //given
    let cart = new Cart(null);

    //when
    //Event triggered by th assertion

    //then
    expect(() => cart.items).toThrow(EmptyCartException);
});

test("total_NominalCase_GetsSum", () => {
    //given
    let cartItem1 = new CartItem(1, "Iphone 27", 1, 10);
    let cartItem2 = new CartItem(2, "Iphone 28", 2, 20);
    let expectedItems = [cartItem1, cartItem2];
    let cart = new Cart(expectedItems);

    jest.spyOn(cartItem1, "total", "get").mockReturnValue(10);
    jest.spyOn(cartItem2, "total", "get").mockReturnValue(40);

    //when
    let total = cart.total;

    //then
    expect(total).toBe(50);
});

test("total_EmptyCart_ThrowException", () => {
    //given
    let cart = new Cart(null);

    //when
    //Event triggered by th assertion

    //then
    expect(() => cart.total).toThrow(EmptyCartException);
});

test("count_OnlySingleQuantityProduct_GetsNumberOfItems", () => {
    //given
    let cartItem1 = new CartItem(1, "Iphone 27", 1, 10);
    let cartItem2 = new CartItem(2, "Iphone 28", 1, 20);
    let items = [cartItem1, cartItem2];
    let cart = new Cart(items);
    let countExpected = 2;

    //when
    //Event triggered by th assertion

    //then
    expect(cart.count()).toEqual(countExpected);
});

test("count_MixSingleAndMultipleQuantityProduct_GetsNumberOfItems", () => {
    //given
    let cartItem1 = new CartItem(1, "Iphone 27", 1, 10);
    let cartItem2 = new CartItem(2, "Iphone 28", 2, 20);
    let items = [cartItem1, cartItem2];
    let cart = new Cart(items);
    let countExpected = 3;

    //when
    //Event triggered by th assertion

    //then
    expect(cart.count()).toEqual(countExpected);
});

test("count_MixSingleAndMultipleQuantityProductDistinct_GetsNumberOfItems", () => {
    //given
    let cartItem1 = new CartItem(1, "Iphone 27", 1, 10);
    let cartItem2 = new CartItem(2, "Iphone 28", 2, 20);
    let items = [cartItem1, cartItem2];
    let cart = new Cart(items);
    let countExpected = 2;

    //when
    //Event triggered by the assertion

    //then
    expect(cart.count(true)).toEqual(countExpected);
});

test("count_EmptyCart_ThrowException", () => {
    //given
    let cart = new Cart(null);

    //when
    //Event triggered by the assertion

    //then
    expect(() => cart.count()).toThrow(EmptyCartException);
});

test("add_EmptyCartAddFirstSingleCartItem_GetsUpdatedNumberOfItems", () => {
    //given
    let cart = new Cart(null);
    let expectedTotalPrice = 10;
    let cartItem1 = new CartItem(1, "Iphone 27", 1, expectedTotalPrice);
    let items = [cartItem1];

    //when
    cart.add(items);

    //then
    expect(cart.total).toEqual(expectedTotalPrice);
});

test("add_EmptyCartEmptyItemsToAdd_ThrowException", () => {
    //given
    let cart = new Cart(null);
    let items = null;

    //when
    expect(() => cart.add(items)).toThrow(UpdateCartException);

    //then
    //Exception is thrown
});

test("add_NotEmptyCartAddCartItem_GetsUpdatedNumberOfItems", () => {
    //given
    let cartItem1 = new CartItem(1, "Iphone 27", 1, 10);
    let cart = new Cart([cartItem1]);
    let cartItem2 = new CartItem(2, "Iphone 28", 2, 20);
    let expectedNumberOfCartItem = 2;

    //when
    cart.add([cartItem2]);

    //then
    expect(cart.count()).toEqual(expectedNumberOfCartItem);
});
