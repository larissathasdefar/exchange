import {
  SET_CURRENCIES,
  SET_RATES,
  START_LOADING_CURRENCIES,
  START_LOADING_RATES,
  SET_ERROR_CURRENCIES,
  SET_ERROR_RATES,
} from 'constants'
import { mergeDeepRight, mergeRight } from 'ramda'

const initial = {
  names: {},
  rates: {
    list: {},
    updatedAt: null,
  },
  loadingNames: false,
  loadingRates: false,
  errorNames: false,
  errorRates: false,
}

const currencies = (state = initial, action) => {
  switch (action.type) {
  case SET_CURRENCIES:
    return mergeRight(state, {
      names: action.currencies.symbols,
      loadingNames: false,
    })
  case SET_RATES:
    return mergeDeepRight(state, {
      rates: {
        list: action.rates.rates,
        updatedAt: new Date().getTime(),
      },
      loadingRates: false,
    })
  case START_LOADING_CURRENCIES:
    return mergeRight(state, {
      loadingNames: true,
      errorNames: false,
    })
  case START_LOADING_RATES:
    return mergeRight(state, {
      loadingRates: true,
      errorRates: false,
    })
  case SET_ERROR_CURRENCIES:
    return mergeRight(state, { errorNames: true })
  case SET_ERROR_RATES:
    return mergeRight(state, { errorRates: true })
  default:
    return state
  }
}

export default currencies
