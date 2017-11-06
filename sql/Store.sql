create table store (
    ID          number not null,
    name        varchar(20),
    address_1   varchar(40),
    address_2   varchar(40),
    tel         varchar(20),
    branch      varchar(10),
    sub_branch  varchar(20),
    primary key (ID)
);

create table menu (
    ID          number not null,
    name        varchar(20),
    price       number,
    foreign key (ID) references store (ID)
);