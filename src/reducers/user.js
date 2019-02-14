import {
  SET_USER,
  ADD_CURRENCY_USER,
  ADD_TRANSACTION,
} from 'constants'

const initial = {
  pockets: [],
  followedRates: [],
  transactions: [],
  photo: '',
  name: '',
}

const getNewPocket = (from, to, pockets) => {
  const pocketFrom = pockets.findIndex(({ code }) => code === from.code)
  const pocketTo = pockets.findIndex(({ code }) => code === to.code)
  pockets[pocketFrom].amount = pockets[pocketFrom].amount - from.amount
  pockets[pocketTo].amount = pockets[pocketTo].amount + to.amount
  return pockets
}

const user = (state = initial, action) => {
  switch (action.type) {
  case SET_USER:
    return { ...state, ...action.user }
  case ADD_CURRENCY_USER:
    return {
      ...state,
      followedRates: [
        ...state.followedRates,
        { from: action.from, to: action.to },
      ]
    }
  case ADD_TRANSACTION:
    const { from, to } = action.transaction
    return {
      ...state,
      pockets: getNewPocket(from, to, [...state.pockets]),
      transactions: [
        action.transaction,
        ...state.transactions,
      ],
    }
  default:
    return state
  }
}

export default user
