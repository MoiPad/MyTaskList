CREATE DATABASE tasklist;

USE tasklist;

CREATE TABLE tasks(
  id int auto_increment primary key,
  titulo varchar(255) not null,
  estado tinyint,
  createAt datetime default current_timestamp,
  updateAt datetime default current_timestamp on update current_timestamp
);
