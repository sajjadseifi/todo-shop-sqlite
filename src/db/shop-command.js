export const INIT_SHOP_COMMAND ="CREATE TABLE IF NOT EXISTS bag" +"(id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, price INTEGER NOT NULL DEFAULT 0, date TEXT NOT NULL);";

export const FETCHED_SHOP_COMMAND = "SELECT * FROM bag";

export const INSERT_SHOP_COMMAND ="INSERT INTO bag(title,price,date) VALUES(?,?,?)";

export const UPDATE_SHOP_COMMAND ="UPDATE bag SET title = ? , price = ?, date = ? WHERE id = ?";

export const DELETE_SHOP_COMMAND = "DELETE FROM bag WHERE id = ?";

export const VIEW_SHOP_COMMAND = "SELECT * FROM bag WHERE id = ?";
