CREATE DATABASE challenge_encriptador

drop table strings

create table strings (
  	id serial primary key,
	iv text not null,
  	content text not null
);