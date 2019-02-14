import {
  SET_USER,
  ADD_CURRENCY_USER,
  REMOVE_CURRENCY_USER,
  ADD_TRANSACTION,
} from 'constants'
import {
  append,
  evolve,
  findIndex,
  lensPath,
  mergeRight,
  over,
  pipe,
  prepend,
  reject,
} from 'ramda'

const initial = {
  pockets: [],
  followedRates: [],
  transactions: [],
  photo: '',
  name: '',
  id: null,
}

const getNewPocket = (from, to) => pockets => {
  const pocketFrom = findIndex(({ code }) => code === from.code, pockets)
  const pocketTo = findIndex(({ code }) => code === to.code, pockets)
  return pipe(
    over(
      lensPath([pocketFrom, 'amount']),
      amount => amount - from.amount,
    ),
    over(
      lensPath([pocketTo, 'amount']),
      amount => amount + to.amount,
    )
  )(pockets)
}

const user = (state = initial, action) => {
  switch (action.type) {
  case SET_USER:
    return mergeRight(state, { ...action.user })
  case ADD_CURRENCY_USER:
    return evolve({
      followedRates: append({ from: action.from, to: action.to })
    })(state)
  case REMOVE_CURRENCY_USER:
    return evolve({
      followedRates: reject(({ from, to }) => from === action.remove.from
        && to === action.remove.to)
    })(state)
  case ADD_TRANSACTION:
    const { from, to } = action.transaction
    return evolve({
      pockets: getNewPocket(from, to),
      transactions: prepend(action.transaction)
    })(state)
  default:
    return state
  }
}

export default user
