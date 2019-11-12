--creating database
CREATE DATABASE inventory_nodejs;

--using the database
use inventory_nodejs;

--creating a tables
CREATE TABLE unidad(
    id_und INT(5) not null serial PRIMARY KEY,
    name_und VARCHAR(30) UNIQUE not null
);

CREATE TABLE product(
    id_product INT(8) not null serial PRIMARY KEY,
    description_pro VARCHAR(100) UNIQUE not null,
    cantidad NUMERIC(5,2),
    und INT(5) not null,
    price_costo NUMERIC(10,2),
    price_sell NUMERIC(10,2),
    FOREIGN KEY(und) REFERENCES unidad(id_und)
);

--show all tables
show tables;
