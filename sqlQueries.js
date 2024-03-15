const sqlQueries = {
    users: {
        tableName: 'Users',
        pkName: 'user_id',
        insert: (data) => `INSERT INTO Users (first_name, last_name, email, password) 
                VALUES ('${data.firstName}', '${data.lastName}', '${data.email}', '${data.password}')`,        
        update: (data) => `UPDATE Users SET first_name = '${data.firstName}', last_name = '${data.lastName}', 
                email = '${data.email}', password = '${data.password}' WHERE user_id = ${data.updateUserID};`,
        delete: (data) => `DELETE FROM Users WHERE user_id = ${data.deleteUserID}`
    },
    outfits: {
        tableName: 'Outfits',
        pkName: 'outfit_id',
        insert: (data) => `INSERT INTO Outfits (name, top_id, bottom_id, shoe_id, jacket_id, formality, last_worn)
                VALUES ('${data.name}', ${data.topID}, ${data.bottomID}, ${data.shoeID}, ${data.jacketID},
                    '${data.formality}', '${data.lastWorn}')`,
        update: (data) => `UPDATE Outfits SET name = '${data.name}', top_id = ${data.topID}, bottom_id = ${data.bottomID}, 
                shoe_id = ${data.shoeID}, jacket_id = ${data.jacketID}, formality = '${data.formality}', 
                last_worn = '${data.lastWorn}' WHERE outfit_id = ${data.updateOutfitID};`,
        delete: (data) => `DELETE FROM Outfits WHERE outfit_id = ${data.deleteOutfitID}`
    },
    tops: {
        tableName: 'Tops',
        pkName: 'top_id',
        insert: (data) => `INSERT INTO Tops (user_id, name, type, color)
                        VALUES ('${data.addUserID}', '${data.name}', '${data.type}', '${data.color}')`,
        update: (data) => `UPDATE Tops
                        SET user_id = ${data.userID}, name = ${data.name}, type = ${data.type}, color = ${data.color}
                        WHERE top_id = ${data.topID}`,
        delete: (data) => `DELETE FROM Tops WHERE top_id = ${data.deleteTopID}`
    },
    bottoms: {
        tableName: 'Bottoms',
        pkName: 'bottom_id',
        insert: (data) => `INSERT INTO Bottoms (user_id, name, type, color)
                        VALUES ('${data.addUserID}', '${data.name}', '${data.type}', '${data.color}')`,
        update: (data) => ``,
        delete: (data) => `DELETE FROM Bottoms WHERE bottom_id = ${data.deleteBottomID}`
    },
    shoes: {
        tableName: 'Shoes',
        pkName: 'shoe_id',
        insert: (data) => `INSERT INTO Shoes (user_id, name, type, color)
                        VALUES ('${data.addUserID}', '${data.name}', '${data.type}', '${data.color}')`,
        update: (data) => ``,
        delete: (data) => `DELETE FROM Shoes WHERE shoe_id = ${data.deleteShoeID}`
    },
    jackets: {
        tableName: 'Jackets',
        pkName: 'jacket_id',
        insert: (data) => `INSERT INTO Jackets (user_id, name, type, color)
                        VALUES ('${data.addUserID}', '${data.name}', '${data.type}', '${data.color}')`,
        update: (data) => ``,
        delete: (data) => `DELETE FROM Jackets WHERE jacket_id = ${data.deleteJacketID}`
    },
    accessories: {
        tableName: 'Accessories',
        pkName: 'accessory_id',
        insert: (data) => `INSERT INTO Accessories (user_id, name, type, color)
                        VALUES ('${data.addUserID}', '${data.name}', '${data.type}', '${data.color}')`,
        update: (data) => ``,
        delete: (data) => `DELETE FROM Accessories WHERE accessory_id = ${data.deleteAccessoryID}`
    },
    occasions: {
        tableName: 'Occansions',
        pkName: 'occasion_id',
        insert: (data) => `INSERT INTO Occasions (user_id, name, formality)
                        VALUES ('${data.addUserID}', '${data.name}', '${data.formality}')`,
        update: (data) => ``,
        delete: (data) => `DELETE FROM Occasions WHERE occasion_id = ${data.deleteOccasionID}`
    },
    outfitsOccasions: {
        tableName: 'OutfitsOccasions',
        pkName: 'outfit_occ_id',
        insert: (data) => `INSERT INTO OutfitsOccasions (outfit_id, occasion_id)
                        VALUES ('${data.addOutfitID}', '${data.addOccasionID}')`,
        update: (data) =>  ``,
        delete: (data) => `DELETE FROM OutfitsOccasions WHERE outfit_occ_id = ${data.deleteOutfitOccID}`
    },
    outfitsAccessories: {
        tableName: 'OutfitsAccessories',
        pkName: 'outfit_acc_id',
        insert: (data) => `INSERT INTO OutfitsAccessories (outfit_id, accessory_id)
                        VALUES ('${data.addOutfitID}', '${data.addAccessoryID}')`,
        update: (data) => ``,
        delete: (data) => `DELETE FROM OutfitsAccessories WHERE outfit_acc_id = ${data.deleteOutfitAccID}`
    },
}

module.exports = sqlQueries;