-- createdb medellinjs

drop table if exists trip_comments, trips, users cascade;

create table users (
  id serial primary key,
  username varchar(128) not null unique,
  full_name varchar(255) not null,
  created_at timestamp not null default current_timestamp
);

create table trips (
  id serial primary key,
  name varchar(255) not null,
  place_name varchar(255) not null,
  user_id integer references users not null
);

create table trip_comments (
  id serial primary key,
  comment varchar(455) not null,
  trip_id integer references trips not null,
  user_id integer references users not null,
  created_at timestamp not null default current_timestamp
);
