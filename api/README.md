# Life plus challenge API

## Get Started

In case you want to run locally:

```
npm install
npm start
```

## Structure

```
app
├── config.json
├── index.js
├── middlewares
├── resources
│   ├── resourceX
│   │   ├── controller.js
│   │   ├── index.js
│   │   ├── model.js
│   │   ├── routes.js
│   │   └── validations.js
│   └── index.js
├── routes
├── services
```

## API Documentation

## **Products**

Get all products

- **URL**

  `api/products/all`

- **Method:**

  `GET`

Get one product

- **URL**

  `api/products/:id`

- **Method:**

  `GET`

* **URL Params**

  **Required:**

  `id=[ObjectId]`

Create product

- **URL**

  `api/products`

- **Method:**

  `POST`

- **Body:**

  **Required:**

  `name=[String]`

  `description=[String]`

  `price=[Number]`

  **Not Required:**

  `discount=[ObjectId]`

  ```json
  {
    "name": "my product",
    "description": "a product description",
    "price": 12.45,
    "discount": "5de8ca07e46d086287bbb707"
  }
  ```

Update product

- **URL**

  `api/products/:id`

- **Method:**

  `PUT`

* **URL Params**

  **Required:**

  `id=[ObjectId]`

- **Body:**

  `name=[String]`

  `description=[String]`

  `price=[Number]`

  ```json
  {
    "price": 10.23
  }
  ```

## **Discounts**

Get all discounts

- **URL**

  `api/discounts/all`

- **Method:**

  `GET`

Get one discount

- **URL**

  `api/discounts/:id`

- **Method:**

  `GET`

* **URL Params**

  **Required:**

  `id=[ObjectId]`

Create discount

- **URL**

  `api/discounts`

- **Method:**

  `POST`

- **Body:**

  **Required:**

  `name=[String]`

  `type=[String]`

  **Required depends on type:**

  `buy_pay=[Array]`

  `percent=[Integer]`

  ```json
  {
    "name": "a buy 3 and pay 2 discount",
    "type": "buy_pay",
    "buy_pay": [3, 2]
  }
  ```

  ```json
  {
    "name": "a percent discount",
    "type": "percent",
    "percent": 10
  }
  ```

Update discount

- **URL**

  `api/discounts/:id`

- **Method:**

  `PUT`

* **URL Params**

  **Required:**

  `id=[ObjectId]`

- **Body:**

  ```json
  {
    "percent": 12
  }
  ```

Delete discount

- **URL**

  `api/discounts/:id`

- **Method:**

  `DELETE`

* **URL Params**

  **Required:**

  `id=[ObjectId]`

## **Codes**

Get all codes

- **URL**

  `api/codes/all`

- **Method:**

  `GET`

Get one code

- **URL**

  `api/codes/:id`

- **Method:**

  `GET`

* **URL Params**

  **Required:**

  `id=[ObjectId]`

Create codes

- **URL**

  `api/codes`

- **Method:**

  `POST`

- **Body:**

  **Required:**

  `name=[String]`

  `code=[String]`

  `type=[String]`

  `value=[Integer]`

  ```json
  {
    "name": "a percentage code",
    "code": "AERB767",
    "type": "percent",
    "value": 12
  }
  ```

  ```json
  {
    "name": "a fixed amount discount",
    "code": "AERB767",
    "type": "fixed",
    "value": 10
  }
  ```

Update code

- **URL**

  `api/codes/:id`

- **Method:**

  `PUT`

* **URL Params**

  **Required:**

  `id=[ObjectId]`

- **Body:**

  ```json
  {
    "value": 34
  }
  ```

Delete code

- **URL**

  `api/codes/:id`

- **Method:**

  `DELETE`

* **URL Params**

  **Required:**

  `id=[ObjectId]`

## **Carts**

Get all carts

- **URL**

  `api/carts/all`

- **Method:**

  `GET`

Get one cart

- **URL**

  `api/carts/:id`

- **Method:**

  `GET`

* **URL Params**

  **Required:**

  `id=[ObjectId]`

Create cart

- **URL**

  `api/cart`

- **Method:**

  `POST`

- **Body:**

  `products=[Array]`

  `discount_code=[ObjectId]`

  ```json
  {
    "products": [
      {
        "product": "5de7c000a4eb6d448846e7a4",
        "quantity": 2
      },
      {
        "product": "5de7c000a4eb6d448846e7b6",
        "quantity": 12
      }
    ],
    "discount_code": "5de8bca5d63dc05e44706b22"
  }
  ```

Update cart

- **URL**

  `api/carts/:id`

- **Method:**

  `PUT`

* **URL Params**

  **Required:**

  `id=[ObjectId]`

- **Body:**

  ```json
  {
    "discount_code": "5de8bca5d63dc05e44706b22"
  }
  ```
