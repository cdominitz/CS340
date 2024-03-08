-- authors:  Calista Dominitz and Matthew Beitler
-- class: CS 340
-- name: Personal outfit manager
-- description: create tables and add sample data

-- added for ease of setup
-- SET FOREIGN_KEY_CHECKS = 0;
-- SET AUTOCOMMIT = 0;

----- CREATE TABLES -----
CREATE TABLE IF NOT EXISTS Users (
  user_id SERIAL PRIMARY KEY,
  first_name varchar (44) NOT NULL,
  last_name varchar (44) NOT NULL,
  email varchar (100) NOT NULL UNIQUE,
  password varchar (25) NOT NULL
);

CREATE TABLE IF NOT EXISTS Outfits (
  outfit_id SERIAL PRIMARY KEY,
  name varchar(256) NOT NULL,
  top_id int NOT NULL,
  bottom_id int NOT NULL,
  shoe_id int NOT NULL,
  jacket_id int,
  formality varchar (100),
  last_worn date,
  FOREIGN KEY (top_id) REFERENCES Tops(top_id)
    ON DELETE CASCADE,
  FOREIGN KEY (bottom_id) REFERENCES Bottoms(bottom_id)
    ON DELETE CASCADE,
  FOREIGN KEY (shoe_id) REFERENCES Shoes(shoe_id)
    ON DELETE CASCADE,
  FOREIGN KEY (jacket_id) REFERENCES Jackets(jacket_id)
  ON DELETE SET NULL
  ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Tops (
  top_id SERIAL PRIMARY KEY,
  user_id int NOT NULL,
  name varchar (100) NOT NULL,
  type varchar (100) NOT NULL,
  color varchar (100) NOT NULL, 
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Bottoms (
  bottom_id SERIAL PRIMARY KEY,
  user_id int NOT NULL,
  name varchar (100) NOT NULL,
  type varchar (100) NOT NULL,
  color varchar (100) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Shoes (
  shoe_id SERIAL PRIMARY KEY,
  user_id int NOT NULL,
  name varchar (100) NOT NULL,
  type varchar (100) NOT NULL,
  color varchar (100) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Jackets (
  jacket_id SERIAL PRIMARY KEY,
  user_id int NOT NULL,
  name varchar (100) NOT NULL,
  type varchar (100) NOT NULL,
  color varchar (100) NOT NULL, 
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Accessories (
  accessory_id SERIAL PRIMARY KEY,
  user_id int NOT NULL,
  name varchar (100) NOT NULL,
  type varchar (100) NOT NULL,
  color varchar (100) NOT NULL, 
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Occasions (
  occasion_id SERIAL PRIMARY KEY,
  user_id int NOT NULL,
  name varchar (100) NOT NULL,
  formality varchar (100) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS Outfits (
  outfit_id SERIAL PRIMARY KEY,
  name varchar(256) NOT NULL,
  top_id int NOT NULL,
  bottom_id int NOT NULL,
  shoe_id int NOT NULL,
  jacket_id int,
  formality varchar (100),
  last_worn date,
  FOREIGN KEY (top_id) REFERENCES Tops(top_id)
    ON DELETE CASCADE,
  FOREIGN KEY (bottom_id) REFERENCES Bottoms(bottom_id)
    ON DELETE CASCADE,
  FOREIGN KEY (shoe_id) REFERENCES Shoes(shoe_id)
    ON DELETE CASCADE,
  FOREIGN KEY (jacket_id) REFERENCES Jackets(jacket_id)
  ON DELETE SET NULL
  ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS OutfitsAccessories (
  outfit_acc_id SERIAL PRIMARY KEY,
  outfit_id int NOT NULL,
  accessory_id int NOT NULL,
  FOREIGN KEY (outfit_id) REFERENCES Outfits(outfit_id)
  ON DELETE CASCADE,
  FOREIGN KEY (accessory_id) REFERENCES Accessories(accessory_id)
  ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS OutfitsOccasions (
  outfit_occ_id SERIAL PRIMARY KEY,
  outfit_id int NOT NULL,
  occasion_id int NOT NULL,
  FOREIGN KEY (outfit_id) REFERENCES Outfits(outfit_id)
  ON DELETE CASCADE,
  FOREIGN KEY (occasion_id) REFERENCES Occasions(occasion_id)
  ON DELETE CASCADE
);

----- ADD SAMPLE DATA TO TABLES -----
INSERT INTO Users (first_name, last_name, email, password)
VALUES ('John', 'Smith', 'jsmith@gmail.com', '1234'),
('Jane', 'Doe', 'jdoe@gmail.com', 'abcd'),
('Alex', 'Doe', 'adoe@gmail.com', 'ABCD');

INSERT INTO Occasions (user_id, name, formality)
VALUES (2, 'family gathering', 'casual'),
(3, 'work', 'business casual'),
(1, 'dinner party', 'formal'),
(2, 'birthday party', 'casual');

INSERT INTO Tops (user_id, name, type, color)
VALUES (2, 'summer tanktop', 'tanktop', 'white'),
(3, 'longsleeve button up', 'button up', 'gray'),
(1, 'formal dress shirt', 'dress shirt', 'white'),
(2, 'sports tee', 't-shirt', 'black'),
(3, 'dark blue polo', 'polo', 'blue');

INSERT INTO Bottoms (user_id, name, type, color)
VALUES (1, 'cotton dress pants', 'slacks', 'black'),
(1, 'levis', 'jeans', 'blue'),
(2, 'flower skirt', 'skirt', 'blue'),
(3, 'cotton twill pants', 'chino', 'beige');

INSERT INTO Shoes (user_id, name, type, color)
VALUES (3, 'air force 1s', 'sneaker', 'white'),
(3, 'brown leather loafers', 'loafers', 'brown'),
(2, 'birkenstocks', 'sandal', 'brown'),
(1, 'black oxford', 'dress shoes', 'black');

INSERT INTO Jackets (user_id, name, type, color)
VALUES (3, 'columbia raincoat', 'raincoat', 'green'),
(3, 'osu sweatshirt', 'hoodie', 'grey'),
(1, '2-button single breated', 'blazer', 'black'),
(2, 'long knit', 'cardigan', 'brown'),
(3, 'zip-up coat', 'coat', 'black');

INSERT INTO Accessories (user_id, name, type, color)
VALUES (2, 'thin plain band', 'ring', 'silver'),
(1, 'silk tie', 'tie', 'red'),
(2, 'gold necklace w/ stone', 'necklace', 'gold'),
(3, 'leather belt', 'belt', 'brown');

INSERT INTO Outfits (name, top_id, bottom_id, shoe_id, jacket_id, formality, last_worn)
VALUES ('suit and tie', 3, 1, 4, 3, 'formal', '20230616'),
('button up and chinos', 2, 4, 2, NULL, 'business casual', '20230529'),
('skirt and cardigan', 1, 3, 3, 4, 'casual', '20230712'),
('polo with jacket', 5, 4, 2, 5, 'business casual', '20230707');

INSERT INTO OutfitsAccessories (outfit_id, accessory_id)
VALUES (1, 2),
(2, 4),
(3, 1),
(3, 3),
(4, 4);

INSERT INTO OutfitsOccasions (outfit_id, occasion_id)
VALUES (1, 3),
(2, 2),
(3, 1),
(3, 4),
(4, 2);

-- SET FOREIGN_KEY_CHECKS = 1;
