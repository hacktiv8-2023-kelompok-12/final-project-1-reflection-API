create table users (
    id serial primary key not null,
    email varchar(50) not null,
    password varchar(64) not null
);

create table reflections (
    id serial primary key not null,
    success varchar(20),
    low_point varchar(20),
    take_away varchar(20),
    UserId integer not null,
    createdAt timestamp default now(),
    updatedAt timestamp default now()
);

alter table reflections add foreign key (UserId) references users(id);