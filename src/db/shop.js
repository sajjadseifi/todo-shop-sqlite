import { openDatabase } from "react-native-sqlite-storage";
import {
  DELETE_SHOP_COMMAND,
  FETCHED_SHOP_COMMAND,
  INIT_SHOP_COMMAND,
  INSERT_SHOP_COMMAND,
  UPDATE_SHOP_COMMAND,
  VIEW_SHOP_COMMAND
} from "./shop-command";

var db = openDatabase("bag.db");

export const init = () => {
  const promise = new Promise((resolve, reject) =>
    db.transaction((tx) =>
      tx.executeSql(
        INIT_SHOP_COMMAND,
        [],
        () => resolve(),
        (_, err) => reject(err)
      )
    )
  );
  return promise;
};

export const getListofShopping = () => {
  const promise = new Promise((resolve, reject) =>
    db.transaction((tx) =>
      tx.executeSql(
        FETCHED_SHOP_COMMAND,
        [],
        (_, result) => {
          var temp = [];
          for (let i = 0; i < result.rows.length; ++i)
            temp.push(result.rows.item(i));
          resolve(temp);
        },
        (_, err) => reject(err)
      )
    )
  );

  return promise;
};

export const insertShopping = (title, price,date) => {
  const promis = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        INSERT_SHOP_COMMAND,
        [title, price,date],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });

  return promis;
};
export const updateShopping = (id, title, price,date) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        UPDATE_SHOP_COMMAND,
        [title, price, date, id],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};
export const deleteShopping = (id) => {

  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        DELETE_SHOP_COMMAND,
        [id],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

export const getShoppingById = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        VIEW_SHOP_COMMAND,
        [id],
        (_, result) => {
          if(result.rows.length > 0)
            resolve(result.rows.item(0));
          else 
          reject(null);
        },
        (_, err) => reject(err)
      );
    });
  });

  return promise;
};