<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Entitas TAKA ECOMMERCE](#entitas-taka-ecommerce)
  - [Users](#users)
  - [Products](#products)
  - [Category](#category)
  - [Orders](#orders)
  - [Orders Items](#orders-items)
  - [Carts](#carts)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Entitas TAKA ECOMMERCE

## Users

- id (UUID)
- name (string)
- email (string, unik)
- password (hashed string)
- role (enum: USER, ADMIN)
- createdAt (datetime)
- updatedAt (datetime)

## Products

- id (UUID)
- name (string)
- description (text)
- price (float)
- stock (integer)
- categoryId (foreign key)
- images (array of URLs atau tabel terpisah untuk gambar)
- createdAt (datetime)
- updatedAt (datetime)

## Category

- id (UUID)
- name (string, unik)
- createdAt (datetime)
- updatedAt (datetime)

## Orders

- id (UUID)
- userId (foreign key)
- totalPrice (float)
- status (enum: PENDING, PAID, SHIPPED, COMPLETED, CANCELED)
- createdAt (datetime)
- updatedAt (datetime)

## Orders Items

- id (UUID)
- orderId (foreign key)
- productId (foreign key)
- quantity (integer)
- price (float)

## Carts

- id (UUID)
- userId (foreign key)
- productId (foreign key)
- quantity (integer)
- createdAt (datetime)
