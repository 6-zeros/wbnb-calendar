CREATE TABLE rooms (
  id INT NOT NULL PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  price INT NOT NULL,
  stars REAL NOT NULL,
  service_fee INT NOT NULL,
  cleaning_fee INT NOT NULL
);

CREATE TABLE reservations (
  id INT PRIMARY KEY NOT NULL,
  room_id INT REFERENCES rooms(id) NOT NULL,
  start_date VARCHAR(70) NOT NULL,
  end_date VARCHAR(70) NOT NULL,
  adults INT NOT NULL,
  children INT NOT NULL,
  infants INT NOT NULL
);