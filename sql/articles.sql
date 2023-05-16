-- \i /home/globi/chatikon/sql/articels.sql

drop table if exists articles;
create table articles(
lang varchar(2) not null,
txt text);
