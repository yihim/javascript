import * as SQLite from "expo-sqlite";
export const openDB = () => {
  const db = SQLite.openDatabase("weather.db");
  return db;
};
