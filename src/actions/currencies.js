import {
  SET_CURRENCIES,
  SET_RATES,
  START_LOADING_CURRENCIES,
  START_LOADING_RATES,
  SET_ERROR_CURRENCIES,
  SET_ERROR_RATES,
} from 'constants'

const FIXER_IO_KEY = '95ec13abed124bd0134c95f38803e688'

export const setCurrencies = currencies => ({
  type: SET_CURRENCIES,
  currencies,
})

export const setRates = rates => ({
  type: SET_RATES,
  rates,
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

export const loadCurrencies = () => {
  return dispatch => {
    dispatch(startLoadingCurrencies())
    return fetch(`http://data.fixer.io/api/symbols?access_key=${FIXER_IO_KEY}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          return dispatch(setCurrencies(data))
        } else {
          throw new Error('Something went wrong...')
        }
      })
      .catch(error => dispatch(setErrorCurrencies()))
  }
}

export const loadRates = () => {
  return dispatch => {
    dispatch(startLoadingRates())
    return fetch(`http://data.fixer.io/api/latest?access_key=${FIXER_IO_KEY}&symbols=USD,GBP,EUR`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          return dispatch(setRates(data))
        } else {
          throw new Error('Something went wrong...')
        }
      })
      .catch(error => dispatch(setErrorRates()))
  }
}
