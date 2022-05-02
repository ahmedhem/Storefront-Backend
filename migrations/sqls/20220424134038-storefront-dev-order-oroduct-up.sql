Create TABLE Orders_products(
 product_id  int REFERENCES Products(product_id) ON DELETE SET NULL,
 order_id  int REFERENCES Orders(order_id) ON DELETE SET NULL,
quantity int
)