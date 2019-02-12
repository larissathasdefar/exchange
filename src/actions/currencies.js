import {
  SET_CURRENCIES,
  SET_RATE,
  START_LOADING_CURRENCIES,
  START_LOADING_RATES,
  SET_ERROR_CURRENCIES,
  SET_ERROR_RATES,
} from 'constants'

export const setCurrencies = currencies => ({
  type: SET_CURRENCIES,
  currencies,
})

export const setRate = rate => ({
  type: SET_RATE,
  rate,
})

export const startLoadingCurrencies = () => ({
  type: START_LOADING_CURRENCIES,
})

export const startLoadingRates = () => ({
  type: START_LOADING_RATES,
})

export const setErrorCurrencies = () => ({
  type: SET_ERROR_CURRENCIES,
})

export const setErrorRates = () => ({
  type: SET_ERROR_RATES,
})
