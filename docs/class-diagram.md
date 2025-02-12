```mermaid
---
title: RIA1 - Shopping Cart
---
classDiagram
    class CartItem {
        - articleId : int
        - name : string
        - quantity : int
        - price : float

        + CartItem(articleId : int, name : string, quantity : int, price : float)
        + ~get~articleId() int
        + ~get~name() string
        + ~get~quantity() int
        + ~get~price() float
        + ~get~total() float
        - ~set~quantity() int
        - ~set~price() float
    }

    class Cart {
        - total : float

        + Cart(items : CartItem[])
        + add(items : CartItem[]) void
        + ~get~total() float
    }

    Cart *-- CartItem

    Error <|-- CartException
    Error <|-- CartItemException

    class CartItemException { }
    class InvalidArticleIdException { }
    class InvalidPriceException { }
    class InvalidQuantityException { }

    CartItemException <|-- InvalidArticleIdException
    CartItemException <|-- InvalidPriceException
    CartItemException <|-- InvalidQuantityException

    class CartException { }
    class EmptyCartException { }
    class UpdateCartException { }

    CartException <|-- EmptyCartException
    CartException <|-- UpdateCartException

    InvalidArticleIdException <.. CartItem : throws
    InvalidPriceException <.. CartItem : throws
    InvalidQuantityException <.. CartItem : throws

    EmptyCartException <.. Cart : throws
    UpdateCartException <.. Cart : throws
```
