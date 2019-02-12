import {
  SET_CURRENCIES,
  SET_RATES,
  START_LOADING_CURRENCIES,
  START_LOADING_RATES,
  SET_ERROR_CURRENCIES,
  SET_ERROR_RATES,
} from 'constants'

const initial = {
  names: {},
  rates: {},
  loadingNames: false,
  loadingRates: false,
  errorNames: false,
  errorRates: false,
}

const currencies = (state = initial, action) => {
  switch (action.type) {
  case SET_CURRENCIES:
    return {
      ...state,
      names: action.currencies,
      loadingNames: false,
    }
  case SET_RATES:
    return {
      ...state,
      rates: action.rates,
      loadingRates: false,
    }
  case START_LOADING_CURRENCIES:
    return {
      ...state,
      loadingNames: true,
      errorNames: false,
    }
  case START_LOADING_RATES:
    return {
      ...state,
      loadingNames: true,
      errorRates: false,
    }
  case SET_ERROR_CURRENCIES:
    return {
      ...state,
      errorNames: true,
    }
  case SET_ERROR_RATES:
    return {
      ...state,
      errorRates: true,
    }
  default:
    return state
  }
}

export default currencies
