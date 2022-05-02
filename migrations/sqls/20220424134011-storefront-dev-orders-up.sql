CREATE TABLE Orders(
order_id Serial Primary key,
user_id int REFERENCES Users(user_id),
CONSTRAINT user_id FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE SET NULL,
order_statue Boolean
)