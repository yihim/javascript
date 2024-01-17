import { openDB } from "../SQLiteDB";
import uuid from "react-native-uuid";

let COLUMN_ID = "weather_id";
let COLUMN_CITY = "city";
let COLUMN_CURRENT_WEATHER = "currentWeather";
let COLUMN_CURRENT_DESCRIPTION = "currentDesc";
let COLUMN_CURRENT_TEMPERATURE = "currentTemp";
let COLUMN_CURRENT_ICON = "currentIcon";
let COLUMN_FORECAST_DAYONE = "forecastDayOne";
let COLUMN_FORECAST_DAYTWO = "forecastDayTwo";
let COLUMN_FORECAST_DAYTHREE = "forecastDayThree";
let COLUMN_FORECAST_DAYFOUR = "forecastDayFour";
let COLUMN_FORECAST_DAYFIVE = "forecastDayFive";
let COLUMN_DEFAULT = "weather_default";
let COLUMN_LATITUDE = "latitude";
let COLUMN_LONGITUDE = "longitude";
let TABLE_NAME = "Weather";

export const createWeatherTableTransaction = () => {
  openDB().transaction(
    (transactionCallBack) => {
      transactionCallBack.executeSql(
        `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}
        (${COLUMN_ID} text primary key, 
          ${COLUMN_CITY} TEXT, 
          ${COLUMN_CURRENT_WEATHER} TEXT, 
          ${COLUMN_CURRENT_DESCRIPTION} TEXT, 
          ${COLUMN_CURRENT_TEMPERATURE} INTEGER, 
          ${COLUMN_CURRENT_ICON} TEXT,
          ${COLUMN_FORECAST_DAYONE} TEXT,
          ${COLUMN_FORECAST_DAYTWO} TEXT,
          ${COLUMN_FORECAST_DAYTHREE} TEXT,
          ${COLUMN_FORECAST_DAYFOUR} TEXT,
          ${COLUMN_FORECAST_DAYFIVE} TEXT,
          ${COLUMN_DEFAULT} TEXT,
          ${COLUMN_LATITUDE} INTEGER,
          ${COLUMN_LONGITUDE} INTEGER)`
      );
    },
    (errorCallBack) => {
      console.log("Weather-create table", errorCallBack.message);
    },
    () => {
      console.log("Transaction successful: Created weather table");
    }
  );
};

export const getAllWeather = (setWeather) => {
  openDB().transaction(
    (transactionCallBack) => {
      transactionCallBack.executeSql(
        `SELECT * FROM ${TABLE_NAME}`,
        [],
        (_, sqlResultSet) => {
          const allWeatherItems = sqlResultSet.rows._array;
          //console.log(allWeatherItems);

          let weather_id = [];
          let city = [];
          let currentWeather = [];
          let currentDesc = [];
          let currentTemp = [];
          let currentIcon = [];
          let forecastDayOne = [];
          let forecastDayTwo = [];
          let forecastDayThree = [];
          let forecastDayFour = [];
          let forecastDayFive = [];
          let weather_default = [];
          let latitude = [];
          let longitude = [];

          for (let i = 0; i < allWeatherItems.length; i++) {
            (weather_id[i] = allWeatherItems[i].weather_id),
              (city[i] = allWeatherItems[i].city),
              (currentWeather[i] = allWeatherItems[i].currentWeather),
              (currentDesc[i] = allWeatherItems[i].currentDesc);
            currentTemp[i] = allWeatherItems[i].currentTemp;
            currentIcon[i] = allWeatherItems[i].currentIcon;
            forecastDayOne[i] = JSON.parse(allWeatherItems[i].forecastDayOne);
            forecastDayTwo[i] = JSON.parse(allWeatherItems[i].forecastDayTwo);
            forecastDayThree[i] = JSON.parse(
              allWeatherItems[i].forecastDayThree
            );
            forecastDayFour[i] = JSON.parse(allWeatherItems[i].forecastDayFour);
            forecastDayFive[i] = JSON.parse(allWeatherItems[i].forecastDayFive);
            (weather_default[i] = allWeatherItems[i].weather_default),
              (latitude[i] = allWeatherItems[i].latitude),
              (longitude[i] = allWeatherItems[i].longitude);
          }

          setWeather({
            weather_id: weather_id,
            city: city,
            currentWeather: currentWeather,
            currentDesc: currentDesc,
            currentTemp: currentTemp,
            currentIcon: currentIcon,
            forecastDayOne: forecastDayOne,
            forecastDayTwo: forecastDayTwo,
            forecastDayThree: forecastDayThree,
            forecastDayFour: forecastDayFour,
            forecastDayFive: forecastDayFive,
            weather_default: weather_default,
            latitude: latitude,
            longitude: longitude,
          });
        }
      );
    },
    (errorCallBack) => {
      console.log("Weather-get all", errorCallBack.message);
    },
    () => {
      console.log("Transaction successful: Get all weather");
    }
  );
};

export const saveWeather = (
  city,
  currentWeather,
  currentDesc,
  currentTemp,
  currentIcon,
  forecastDayOne,
  forecastDayTwo,
  forecastDayThree,
  forecastDayFour,
  forecastDayFive,
  weather_default,
  latitude,
  longitude,
  saveCallBack
) => {
  openDB().transaction(
    (transactionCallBack) => {
      const id = uuid.v4();
      transactionCallBack.executeSql(
        `INSERT OR REPLACE INTO ${TABLE_NAME} 
        (${COLUMN_ID},
            ${COLUMN_CITY},
            ${COLUMN_CURRENT_WEATHER}, 
            ${COLUMN_CURRENT_DESCRIPTION}, 
            ${COLUMN_CURRENT_TEMPERATURE}, 
            ${COLUMN_CURRENT_ICON},
            ${COLUMN_FORECAST_DAYONE},
            ${COLUMN_FORECAST_DAYTWO},
            ${COLUMN_FORECAST_DAYTHREE},
            ${COLUMN_FORECAST_DAYFOUR},
            ${COLUMN_FORECAST_DAYFIVE},
            ${COLUMN_DEFAULT},
            ${COLUMN_LATITUDE},
            ${COLUMN_LONGITUDE})
        VALUES( ?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          id,
          city,
          currentWeather,
          currentDesc,
          currentTemp,
          currentIcon,
          forecastDayOne,
          forecastDayTwo,
          forecastDayThree,
          forecastDayFour,
          forecastDayFive,
          weather_default,
          latitude,
          longitude,
        ],
        (_, sqlResultSet) => {
          saveCallBack(true);
        }
      );
    },
    (errorCallBack) => {
      console.log("Current-save", errorCallBack.message);
      saveCallBack(false);
    },
    () => {
      console.log("Transaction successful: Saved weather");
    }
  );
};

export const deleteWeather = (id, deleteCallBack) => {
  openDB().transaction(
    (transactionCallBack) => {
      transactionCallBack.executeSql(
        `DELETE FROM ${TABLE_NAME}
           WHERE ${COLUMN_ID} = ?`,
        [id],
        //deconscruct sqlResultSet
        (_, { insertId, rows, rowsAffected }) => {
          deleteCallBack(true);
        }
      );
    },
    (errorCallBack) => {
      console.log("Weather-delete", errorCallBack.message);
      deleteCallBack(false);
    },
    () => {
      console.log(`Transaction successful: Deleted weather - ID: ${id}`);
    }
  );
};

export const updateWeather = (
  city,
  currentWeather,
  currentDesc,
  currentTemp,
  currentIcon,
  forecastDayOne,
  forecastDayTwo,
  forecastDayThree,
  forecastDayFour,
  forecastDayFive,
  latitude,
  longitude,
  weather_id,
  updateCallBack
) => {
  openDB().transaction(
    (transaction) => {
      transaction.executeSql(
        `UPDATE ${TABLE_NAME}
        SET 
        ${COLUMN_CITY} = ?,
        ${COLUMN_CURRENT_WEATHER} = ?, 
        ${COLUMN_CURRENT_DESCRIPTION} = ?, 
        ${COLUMN_CURRENT_TEMPERATURE} = ?, 
        ${COLUMN_CURRENT_ICON} = ?,
        ${COLUMN_FORECAST_DAYONE} = ?,
        ${COLUMN_FORECAST_DAYTWO} = ?,
        ${COLUMN_FORECAST_DAYTHREE} = ?,
        ${COLUMN_FORECAST_DAYFOUR} = ?,
        ${COLUMN_FORECAST_DAYFIVE} = ?,
        ${COLUMN_LATITUDE} = ?,
        ${COLUMN_LONGITUDE} = ?
        WHERE ${COLUMN_ID} = ?`,
        [
          city,
          currentWeather,
          currentDesc,
          currentTemp,
          currentIcon,
          forecastDayOne,
          forecastDayTwo,
          forecastDayThree,
          forecastDayFour,
          forecastDayFive,
          latitude,
          longitude,
          weather_id,
        ],
        (_, resultSet) => {
          updateCallBack(true);
        }
      );
    },
    (errorCallBack) => {
      console.log("Weather-update", errorCallBack.message);
      updateCallBack(false);
    },
    (successCallBack) => {
      console.log("Transaction successful: Updated weather");
    }
  );
};
