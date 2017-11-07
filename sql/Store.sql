create table store (
    ID          integer not null auto_increment,
    name        varchar(20) CHARSET utf8,
    address_1   varchar(40) CHARSET utf8,
    address_2   varchar(40) CHARSET utf8,
    tel         varchar(20) CHARSET utf8,
    branch      varchar(10) CHARSET utf8,
    sub_branch  varchar(20) CHARSET utf8,
    primary key (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table menu (
    ID          integer not null,
    name        varchar(20) CHARSET utf8,
    price       integer,
    foreign key (ID) references store (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;