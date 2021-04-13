
create database readyassist;
use readyassist;
CREATE TABLE `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token_id` text,
  `name` varchar(200) DEFAULT 'Customer',
  `mobile` varchar(10) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  'otp' int(6),
  `registered_on` date DEFAULT NULL,
  `balance` double NOT NULL DEFAULT '0',
  `status` varchar(50) NOT NULL DEFAULT 'ACTIVE',
  `create_date_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobile` (`mobile`),
  UNIQUE KEY `email` (`email`)
);


CREATE TABLE driver (
  id int(11) NOT NULL AUTO_INCREMENT,
  token_id text,
  otp varchar(6),
  name varchar(200) DEFAULT 'Customer',
  mobile varchar(10) NOT NULL,
  email varchar(100) DEFAULT NULL,
  registered_on date DEFAULT NULL,
  balance double NOT NULL DEFAULT '0',
  status varchar(50) NOT NULL DEFAULT 'ACTIVE',
  create_date_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  update_date_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY mobile (mobile),
  UNIQUE KEY email (email)
);

create table cab (
    id int(11) NOT NULL AUTO_INCREMENT,
    reg_no varchar(10),
    car_type varchar(20),
    company_name varchar(50),
    driver_id int(11),
    cur_lat double,
    cur_long double,
    create_date_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_date_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE key reg_no (reg_no),
    key driver_id (driver_id)
);


create table rating (
    id int(11) NOT NULL AUTO_INCREMENT,
    user_id int(11),
    user_type varchar(20),
    rating tinyint,
    remark text,
    rater_by_user_id int(11),
    create_date_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_date_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    key user_id (user_id),
    key user_type (user_type)
);

create table booking_deatils (
    id int(11) NOT NULL AUTO_INCREMENT, 
    customer_id int(11) NOT NULL,
    driver_id int (11) NOT NULL, 
    car_id int(11) NOT NULL, 
    start_lat double,
    start_long double, 
    end_lat double, 
    end_long double, 
    journy_date date, 
    trip_start_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    trip_end_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    start_name varchar(100), 
    destination_name varchar(100),
    journey_cost double,
    create_date_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_date_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY key (id),
    KEY customer_id (customer_id),
    key driver_id (driver_id),
    key car_id (car_id)
);


SELECT c.reg_no, c.car_type, c.driver_id, c.cur_lat,c.cur_long, c.city_id, 
      111.045* DEGREES(ACOS(LEAST(1.0, COS(RADIANS(p.latpoint))
                 * COS(RADIANS(c.cur_lat))
                 * COS(RADIANS(p.longpoint) - RADIANS(c.cur_long))
                 + SIN(RADIANS(p.latpoint))
                 * SIN(RADIANS(c.cur_lat))))) AS distance_in_km
 FROM cab as c
 JOIN (
     SELECT  12.954530  AS latpoint,  77.702700 AS longpoint
   ) AS p ON 1=1
 HAVING distance_in_km < 10
 ORDER BY distance_in_km;

