import {
  SET_USER,
  ADD_CURRENCY_USER,
  ADD_TRANSACTION,
} from 'constants'

export const setUser = user => ({
  type: SET_USER,
  user,
})

export const addCurrency = (from, to) => ({
  type: ADD_CURRENCY_USER,
  from,
  to,
})

export const addTransaction = (from, to, date) => ({
  type: ADD_TRANSACTION,
  transaction: { from, to, date }
})
