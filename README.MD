# Introduction to GraphQL

## Database
if you don't have postgres running locally visit [elephantsql](https://www.elephantsql.com/), create an accout, then a db and run on browser
the next script:

```sql
create table users (
  id serial primary key,
  username varchar(255) not null unique,
  full_name varchar(255) not null,
  language varchar(255) not null, 
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

```

## Project

### Clone this repo
```shell
$ git clone https://github.com/estrada9166/medellinjs-graphql
```

```shell
$ git clone git@github.com:estrada9166/medellinjs-graphql.git
```

### Install dependencies
```shell
$ npm i
```

### Run the project
```shell
$ npm run dev
```