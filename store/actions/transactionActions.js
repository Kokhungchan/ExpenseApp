import moment from "moment";
import { ADD_TRANSACTION, DELETE_TRANSACTION } from "./types";

export const addTransaction = ({ title, price, category, addedtime, month }) => (dispatch) => {
  const id = Math.floor(Math.random() * 600000);

  const formatNumber = parseInt(price.replace(/[, ]+/g, ''));
  const newTransaction = {
    id,
    title,
    category,
    price: +formatNumber,
    addedtime: mainTime(),
    month: getMonth(),
    year: getYear()
  };

  dispatch({ type: ADD_TRANSACTION, payload: newTransaction });
};

export const deleteTransaction = (id) => (dispatch, getState) => {
  dispatch({ type: DELETE_TRANSACTION, payload: id });
};

export const getMonth = () => {
  var currentTime = new Date();
  var month = currentTime.getMonth();

  return month; 
}

export const getYear = () => {
  var currentTime = new Date();
  var year = currentTime.getFullYear();

  return year; 
}

export const mainTime = () => {
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }

  var currentTime = new Date();
  // returns the month (from 0 to 11)
  var month = currentTime.getMonth() + 1;

  // returns the day of the month (from 1 to 31)
  var day = currentTime.getDate();

  // returns the year (four digits)
  var year = currentTime.getFullYear();

  // write output MM/dd/yyyy
  const MiliTime = year + "-" + pad(month) + "-" + pad(day);

  // const mainTime = moment(`${a}T00:00:00`).valueOf();
  return moment(`${MiliTime}T00:00:00`).valueOf();
};
