create extension if not exists "uuid-ossp";

drop table if exists products cascade;

create table products (
	id uuid not null default uuid_generate_v4() primary key,
	title text not null,
	description text not null,
  price integer not null
);

drop table if exists stocks cascade;

create table stocks(
	product_id uuid primary key,
	count integer not null default 0
);

alter table stocks add constraint fk_stocks_products foreign key (product_id) references products(id);

insert into products(id, title, description, price) values ('513e9593-e66f-4582-ae71-f902384425f4','Product 1', 'Description of product 1', 105);
insert into products(id, title, description, price) values ('fbd4be50-6138-4a2f-8078-7c9f830b8996','Product 2', 'Description of product 2', 101);
insert into products(id, title, description, price) values ('d764632f-32d3-43e3-bd3e-ef7bc5db5250','Product 3', 'Description of product 3', 25);

insert into stocks(product_id, count) values ('513e9593-e66f-4582-ae71-f902384425f4', 10);
insert into stocks(product_id, count) values ('fbd4be50-6138-4a2f-8078-7c9f830b8996', 5);
insert into stocks(product_id, count) values ('d764632f-32d3-43e3-bd3e-ef7bc5db5250', 25);