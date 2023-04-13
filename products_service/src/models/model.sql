CREATE TYPE role_enum AS ENUM ('customers', 'admin');

CREATE TABLE
    IF NOT EXISTS customers(
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(20) NOT NULL,
        role role_enum NOT NULL DEFAULT 'customers'
    );

CREATE TABLE
    IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        product_name VARCHAR(100) NOT NULL,
        description TEXT,
        price INT NOT NULL,
        customer_id INT,
        FOREIGN KEY (customer_id) REFERENCES customers(id)
    );