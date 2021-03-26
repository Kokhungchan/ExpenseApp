import { ADD_TRANSACTION, DELETE_TRANSACTION } from "../actions/types";

const initialState = {
  transactions: [
      {
        "addedtime": 1617638400000,
        "category": "Gifts",
        "id": 198967,
        "month": 3,
        "price": -500,
        "title": "Allowance",
        "year": 2021,
      },
      {
        "addedtime": 1617638400000,
        "category": "Others",
        "id": 411484,
        "month": 3,
        "price": 4000,
        "title": "Salary",
        "year": 2021,
      },
      {
        "addedtime": 1617033600000,
        "category": "Home",
        "id": 349303,
        "month": 2,
        "price": -200,
        "title": "Movie",
        "year": 2021,
      },
      {
        "addedtime": 1616083200000,
        "category": "Entertainment",
        "id": 482819,
        "month": 2,
        "price": -250,
        "title": "Credit card loan",
        "year": 2021,
      },
      {
        "addedtime": 1616083200000,
        "category": "Food & Drink",
        "id": 338689,
        "month": 2,
        "price": -800,
        "title": "Food",
        "year": 2021,
      },
      {
        "addedtime": 1615392000000,
        "category": "Gifts",
        "id": 384380,
        "month": 2,
        "price": -500,
        "title": "Allowance",
        "year": 2021,
      },
      {
        "addedtime": 1615392000000,
        "category": "Others",
        "id": 525537,
        "month": 2,
        "price": 4000,
        "title": "Salary",
        "year": 2021,
      },
  ],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [payload, ...state.transactions],
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(({ id }) => id !== payload),
      };
    default:
      return state;
  }
};
