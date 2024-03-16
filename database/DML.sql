-- Database Manipulation queries for Personal Outfit Manager

----- INSERT NEW RECORD -----
-- add new user
INSERT INTO Users (first_name, last_name, email, password)
VALUES (:first_name_insert, :last_name_insert, :email_insert, :password_insert);

-- add new outfit
INSERT INTO Outfit (name, top_id, bottom_id, shoe_id, jacket_id, formality, last_worn)
VALUES (:name, :top_id_insert, :bottom_id_insert, :shoe_id_insert, 
        :jacket_id_insert :formality_insert, :last_worn_insert);

-- add new top
INSERT INTO Tops (user_id, name, type, color)
VALUES (:user_id_insert, :name_insert, :type_insert, :color_insert);

-- add new bottom
INSERT INTO Bottoms (user_id, name, type, color)
VALUES (:user_id_insert, :name_insert, :type_insert, :color_insert);

-- add new shoes
INSERT INTO Shoes (user_id, name, type, color)
VALUES (:user_id_insert, :name_insert, :type_insert, :color_insert);

-- add new jacket
INSERT INTO Jackets (user_id, name, type, color)
VALUES (:user_id_insert, :name_insert, :type_insert, :color_insert);

-- add new accessory
INSERT INTO Accessories (user_id, name, type, color)
VALUES (:user_id_insert, :name_insert, :type_insert, :color_insert);

-- add new occasion
INSERT INTO Occasions (user_id, name, formality)
VALUES (:user_id_insert, :name_insert, :formality_insert);

-- associate outfit with occasion (M:M relationship addition)
INSERT INTO OutfitsOccasions (outfit_id, occasion_id)
VALUES (outfit_id_insert, occasion_id_insert);

-- associate outfit with accessory (M:M relationship addition)
INSERT INTO OutfitsAccessories (outfit_id, accessory_id)
VALUES (outfit_id_insert, accessory_id_insert);


------ SELECT ALL VALUES ------
-- get all users
SELECT * FROM Users;

-- get all outfits
SELECT Outfits.outfit_id, Outfits.name, 
        Tops.name as tops, Bottoms.name as bottoms, 
        Shoes.name as shoes, Jackets.name as jackets, 
        Outfits.formality, Outfits.last_worn
FROM Outfits
JOIN Tops ON Outfits.top_id = Tops.top_id
JOIN Bottoms ON Outfits.bottom_id = Bottoms.bottom_id
JOIN Shoes ON Outfits.shoe_id = Shoes.shoe_id
LEFT JOIN Jackets ON Outfits.jacket_id = Jackets.jacket_id;

-- get all tops
SELECT * FROM Tops;

-- get all bottoms
SELECT * FROM Bottoms;

-- get all shoes
SELECT * FROM Shoes;

-- get all jackets
SELECT * FROM Jackets;

-- get all accessories
SELECT * FROM Accessories;

-- get all occasions
SELECT * FROM Occasions;

-- get all Outfit Occasion associations
SELECT OutfitsOccasions.outfit_occ_id, 
        Outfits.name as outfit, Occasions.name as occasion
FROM OutfitsOccasions
JOIN Outfits ON OutfitsOccasions.outfit_id = Outfits.outfit_id
JOIN Occasions ON OutfitsOccasions.occasion_id = Occasions.occasion_id;

-- get all Outfit Accessory associations
SELECT OutfitsAccessories.outfit_acc_id, 
        Outfits.name as outfit, Accessories.name as accessory
FROM OutfitsAccessories
JOIN Outfits ON OutfitsAccessories.outfit_id = Outfits.outfit_id
JOIN Accessories ON OutfitsAccessories.accessory_id = Accessories.accessory_id;


------ SELECT SPECIFIC VALUES ------
-- get specified user
SELECT user_id, first_name, last_name, email, password 
FROM Users WHERE user_id = :selected_user_id

-- get outfit_id 
SELECT outfit_id FROM Outfits WHERE name = :specified_name AND top_id = :specified_top AND
 bottom_id = :specified_bottom AND shoe_id = :specified_shoe AND jacket_id = :specified_jacket
 AND formality = :specified_formality AND last_worn = :specified_last_worn;

-- get specified outfit
SELECT Outfits.outfit_id, name, 
        Tops.name as tops, Bottoms.name as bottoms, 
        Shoes.name as shoes, Jackets.name as jackets, 
        Outfits.formality, Outfits.last_worn
FROM Outfits
JOIN Tops ON Outfits.top_id = Tops.top_id
JOIN Bottoms ON Outfits.bottom_id = Bottoms.bottom_id
JOIN Shoes ON Outfits.shoe_id = Shoes.shoe_id
LEFT JOIN Jackets ON Outfits.jacket_id = Jackets.jacket_id
WHERE Outfits.outfit_id = :selected_outfit_id;

-- get specified top
SELECT top_id, user_id, name, type, color
FROM Tops WHERE top_id = :selected_top_id;

-- get specified bottom
SELECT bottom_id, user_id, name, type, color
FROM Bottoms WHERE bottom_id = :selected_bottom_id;

-- get specified shoe
SELECT shoe_id, user_id, name, type, color
FROM Shoes WHERE shoe_id = :selected_shoe_id;

-- get specified jacket
SELECT jacket_id, user_id, name, type, color
FROM Jackets WHERE jacket_id = :selected_jacket_id;

-- get specified accessory
SELECT accessory_id, user_id, name, type, color
FROM Accessories WHERE accessory_id = :selected_accessory_id;

-- get specified occasion
SELECT occasion_id, user_id, name, formality
FROM Occasions WHERE occasion_id = :selected_occasion_id;

-- get specified Outfit Occasion associations
SELECT OutfitsOccasions.outfit_occ_id, Outfits.description as outfit, Occasions.name as occasion
FROM OutfitsOccasions
JOIN Outfits ON OutfitsOccasions.outfit_id = Outfits.outfit_id
JOIN Occasions ON OutfitsOccasions.occasion_id = Occasions.occasion_id
WHERE OutfitsOccasions.outfit_occ_id = :selected_outfit_occ_id;

-- get specified Outfit Accessory associations
SELECT OutfitsAccessories.outfit_acc_id, Outfits.description as outfit, Accessories.name as accessory
FROM OutfitsAccessories
JOIN Outfits ON OutfitsAccessories.outfit_id = Outfits.outfit_id
JOIN Accessories ON OutfitsAccessories.accessory_id = Accessories.accessory_id
WHERE OutfitsAccessories.outfit_acc_id = :selected_outfit_acc_id;


------ SELECT VALUES FOR DROPDOWN------
-- get all users
SELECT user_id, CONCAT(first_name, " ", last_name) AS name
From Users;

-- get all outfits
SELECT outfit_id, name FROM Outfits;

-- get all tops
SELECT top_id, name FROM Tops;

-- get all bottoms
SELECT bottom_id, name FROM Bottoms;

-- get all shoes
SELECT shoe_id, name FROM Shoes;

-- get all jackets
SELECT jacket_id, name FROM Jackets;

-- get all accessories
SELECT accessory_id, name FROM Accessories;

-- get all occasions
SELECT occasion_id, name FROM Occasions;


----- UPDATE A RECORD -----
-- update user
UPDATE Users 
SET first_name = :update_first_name, last_name = :update_last_name, email = :update_email 
WHERE user_id = :selected_user_id

-- update outfit
UPDATE Outfits
SET description = :update_description, top_id = :update_top_id, bottom_id = :update_bottom_id,
        shoe_id = :update_shoe_id, jacket_id = :update_jacket_id, formality = :update_formality,
        last_worn = :update_last_worn
WHERE outfit_id = :update_outfit_id

-- update top
UPDATE Tops
SET user_id = :update_user_id, name = :update_name, type = :update_type, color = :update_color
WHERE top_id = :update_top_id

-- update bottom
UPDATE Bottoms 
SET user_id = :update_user_id, name = :update_name, type = :update_type, color = :update_color
WHERE bottom_id = :update_bottom_id

-- update shoes
UPDATE Shoes 
SET user_id = :update_user_id, name = :update_name, type = :update_type, color = :update_color
WHERE shoe_id = :update_shoe_id

-- update jacket
UPDATE Jackets 
SET user_id = :update_user_id, name = :update_name, type = :update_type, color = :update_color
WHERE jacket_id = :update_jacket_id

-- update accessory
UPDATE Accessories 
SET user_id = :update_user_id, name = :update_name, type = :update_type, color = :update_color
WHERE accessory_id = :update_accessory_id

-- update occasion
UPDATE Occasions 
SET user_id = :update_user_id, name = :update_name, formality = :update_formality
WHERE occasion_id = :update_occasion_id

-- update outfitoccasion
UPDATE OutfitsOccasions
SET outfit_id = :update_outfit_id, occasion_id = :update_occasion_id
WHERE outfit_occ_id = :update_outfit_occ_id

-- update outfitaccessory
UPDATE OutfitsAccessories
SET outfit_id = :update_outfit_id, accessory_id = :update_accessory_id
WHERE outfit_occ_id = :update_outfit_acc_id


----- DELETE A RECORD -----
-- delete user record
DELETE FROM Users WHERE user_id = :delete_user_id

-- delete outfit record
DELETE FROM Outfits WHERE outfit_id = :delete_outfit_id

-- delete top record
DELETE FROM Tops WHERE top_id = :delete_top_id

-- delete bottom record
DELETE FROM Bottoms WHERE bottom_id = :delete_bottom_id

-- delete shoe record
DELETE FROM Shoes WHERE shoe_id = :delete_shoe_id

-- delete jacket record
DELETE FROM Jackets WHERE jacket_id = :delete_jacket_id

-- delete accessory record
DELETE FROM Accessories WHERE accessory_id = :delete_accessory_id

-- delete occasion record
DELETE FROM Occasions WHERE occasion_id = :delete_occasion_id

-- dis-associate an outfit from an occasion
DELETE FROM OutfitsOccasions 
WHERE outfit_id = :delete_outfit_id_from_outfit_occasion 
AND occasion_id = :delete_occasion_id_from_outfit_occasion

-- dis-associate an outfit from an accessory
DELETE FROM OutfitsAccessories 
WHERE outfit_id = :delete_outfit_id_from_outfit_accessory 
AND accessory_id = :delete_accessory_id_from_outfit_accessory

