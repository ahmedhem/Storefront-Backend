# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints
#### Products
- Index [token required]: `'api/product/' [GET]`
- Show [token required]: `'api/product/:id' [GET]`
- Create (args: Product)[token required]: `'api/product/' [POST] (token)`
- [ADDED] Update (args: Product)[token required]: `'api/product/:id' [PATCH] (token)`
- [ADDED] Delete (args: id)[token required]: `'api/product/  [DELETE]`

#### Users
- Index [token required]: `'api/user/' [GET] (token)`
- Show [token required]: `'api/user/:id' [GET] (token)`
- Create (args: User)[token required]: `'api/user/' [POST] (token)`
- [ADDED] Delete (args: id)[token required]: `'api/user/' [DELETE] (token)`
- [ADDED] Update [token required]: `'api/user/:id' [PATCH] (token)`

#### Orders
- Index [token required]: `'api/order/' [GET] (token)`
- Show [token required]: `'api/order/:id' [GET] (token)`
- Create (args: order)[token required]: `'api/order/' [POST] (token)`
- [ADDED] Delete (args: id)[token required]: `'api/order/' [DELETE] (token)`
- [ADDED] Update [token required]: `'api/order/:id' [PATCH] (token)`

## Data Shapes
#### Product
- product_id
- name
- price

```
Table: Product (product_id:serial[primary key], name:varchar(40), price:number)
```
#### User
- user_id
- firstName
- lastName
- password

```
Table: User (user_id:serial[primary key], firstName:varchar(30), lastName:varchar(30), password:varchar(60)[not null])
```
#### Orders
- order_id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (true or false)

```
Table: Orders (order_id:serial[primary key], product_id:integer(foreign key to products table), quantity:integer[default 1], user_id:integer(foreign key to users table), status:Boolean)
```
