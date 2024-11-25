<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [API SPEC TAKA ECOMMERCE](#api-spec-taka-ecommerce)
  - [Authentication](#authentication)
    - [Register](#register)
    - [Login](#login)
    - [Logout](#logout)
  - [Users](#users)
    - [Get Users](#get-users)
    - [Get Single User](#get-single-user)
  - [Products](#products)
    - [Get Products](#get-products)
    - [POST Product](#post-product)
    - [Update Product](#update-product)
    - [Delete Product](#delete-product)
  - [Orders](#orders)
    - [GET Orders](#get-orders)
    - [POST Orders](#post-orders)
  - [Cart](#cart)
    - [GET Carts](#get-carts)
    - [Create Carts](#create-carts)
    - [Delete Carts](#delete-carts)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# API SPEC TAKA ECOMMERCE

## Authentication

### Register

Endpoint: POST /auth/register

Deskripsi: Pendaftaran Pengguna

Request Body:

```json
{
  "name": "Jhon Doe",
  "email": "jhondoe@gmail.com",
  "password": "password123",
}
```

Response Body:

```json
{
  "message": "User registered succesfully",
  "user": {
    "id": "uuid",
    "name": "Jhon Doe",
    "email": "jhondoe@gmail.com",
    "role": "USER",
  }
}
```

Response Failed:

```json
{
  "message": "User must not black, ...."
}
```

### Login

Endpoint: POST /auth/login

Deskripsi: Login Pengguna

Request Body:

```json
{
  "email": "jhondoe@gmail.com",
  "password": "password123"
}
```

Response Body: 

```json
{
  "message": "Login succesfully",
  "token": "token"
}
```

Response Failed: 

```json
{
  "message": "Username or Password wrong"
}
```

### Logout

Deskripsi: User logout

Endpoint: DELETE /users

Headers: Authorization Bearer token

Response Body:

```json
{
  "message": "succesfully Logout"
}
```

Response Failed: 

```json
{
  "message": "Unautorized"
}
```

## Users

### Get Users 

Deskripsi: Mendapatkan daftar pengguna (admin only)

Headers: Authorization Bearer token

Endpoint: /users

Response Body: 
```json
{
  {
  "id": "uuid",
  "name": "Jhon Doe",
  "email": "jhondoe@gmail.com",
  "role": "USER",
  "createAt": "2024-01-01T00:00:00Z"
  },
  {dll}
}
```
Response Body Failed:
```json
{
  "message": "Unautorized, ..."
}
```

### Get Single User

Deskripsi: Mendapatkan data satu pengguna

Endpoint: /users/:id

Response Body: 
```json
{
  "id": "uuid",
  "name": "Jhon Doe",
  "email": "jhondoe@gmail.com",
  "role": "USER",
  "createAt": "2024-01-01T00:00:00Z"
}
```
Response Body Failed: 
```json
{
  "message": "Unautorized, ..."
}
```

## Products

### Get Products

Deskirpsi: Mendapatkan daftar product

Endpoint: GET /products

Response Body: 

```json
{
  {
  "id": "uuid",
  "name": "Product A",
  "description": "Products description",
  "price": 100.0
  "stock": 10,
  "category": "categoryA",
  "images": ["img-url.jpg", "img-url-2.jpg"]
  },
  {dll}
}
```
Response Failed: 
```json
{
  "message": "Product Not Found"
}
```

### POST Product

Deskripsi: Membuat data product (Admin Only)

Endpoint: POST /products

Headers: Authorization Bearer token

Request Body: 
```json
{
  "name": "Product A",
  "description": "Product Deskripsi",
  "price": 100.0,
  "stock": 10,
  "category": "categoryA",
  "images": ["img-url.jpg", "img-url-2.jpg"]
}
```

Response Body: 
```json
{
  "message": "Product Added Succesfully",
    "product": {
    "name": "Product A",
    "description": "Product Deskripsi",
    "price": 100.0,
    "stock": 10,
    "category": "categoryA",
    "images": ["img-url.jpg", "img-url-2.jpg"]
  }
}
```

Response Failed:
```json
{
  "message": "Field Must Not Be Black"
}
```

### Update Product

Deskripsi: Mengupdate data product

Endpoint: PUT /products/:id

Headers: Authorization Bearer token

Request Body: 
```json
{
  "name": "Product A Updated",
  "price": 120.0,
  "stock": 5
}
```

Response Body: 
```json
{
  "message": "Product updated successfully",
  "product": {
    "id": "uuid",
    "name": "Product A Updated",
    "price": 120.0,
    "stock": 5
  }
}
```

### Delete Product 

Deskripsi: Menghapuus product

Endpoint: DELETE /products/:id

Headers: Authorization Bearer token

Response Body:
```json
{
  "message": "Product Removed Succesfully"
}
```

Response Failed:
```json
{
  "message": "Product Not Found"
}
```

## Orders

### GET Orders

Deskripsi: Mendapatkan Semua Orders

Endpoint: GET /orders

Headers: Authorization Bearer Token

Response Body:
```json
{
  [
    {
      "id": "uuid",
      "userId": "uuid",
      "totalPrice": 200.0,
      "status": "PENDING",
      "createAt": "2024-01-01T00:00:00Z",

    }
  ]
}
```

Response Failde:
```json
{
  "message": "Failed Orders"
}
```

### POST Orders

Deskripsi: Membuat Orders

Endpoint: POST /orders

Headers: Authorization Bearer Token

Request Body:
```json
{
  "items": [
    {
      "productid": "uuid",
      "quantity": 12,
    }
  ]
  "totalPrice": 200.0,
}
```

Response Body: 
```json
{
  "message": "Order created successfully",
  "order": {
    "id": "uuid",
    "userId": "uuid",
    "totalPrice": 200.0,
    "status": "PENDING"
  }
}
```

Response Failed:
```json
{
  "message": "Orders Create Failed"
}
```

## Cart

### GET Carts

Deskripsi: Mendapatkan Keranjang

Endpoint: GET /carts

Headers: Authorization Bearer Token

Response Body:
```json
{
  [
    {
      "productId": "uuid",
      "quantity": 2,
      "price": 100.0
    }
  ]
}
```

Response Failed:
```json
{
  "message": "Failed Get Carts"
}
```

### Create Carts

Deskripsi: Menambahkan Keranjang

Endpoint: POST /carts

Headers: Authorization Bearer Token

Request Body:
```json
{
  "productId": "uuid",
  "quantity": 3
}
```
Response Body:
```json
{
  "message": "Product Added to Cart"
}
```
Response Failed:
```json
{
  "message": "Failed Add to Cart"
}
```

### Delete Carts

Deskripsi: Menghapus product dari Keranjang

Endpoint: DELETE /cart/:productId

Headers: Authorization Bearer Token

Response Body:
```json
{
  "message": "Product Removed From Cart"
}
```
