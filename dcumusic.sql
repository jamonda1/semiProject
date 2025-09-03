use dcumusic;
show tables;

create table if not exists members (
	id int primary key auto_increment,
    name varchar(30) not null,
    email varchar(50) not null unique,
    passwd varchar(100) not null,
    refreshtoken varchar(512) default null
);

insert into members (name, email, passwd)
values ('test', 'test@test', '111');

select * from members;
