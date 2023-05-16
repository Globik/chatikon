-- \i /root/chatikon/sql/articles.sql

drop table if exists articles;
create table articles(
lang varchar(2) not null,
txt text);
