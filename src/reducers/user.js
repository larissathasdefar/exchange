import { SET_USER, ADD_CURRENCY_USER } from 'constants'

const initial = {
  pockets: [],
  followedRates: [],
  transactions: [],
  photo: '',
  name: '',
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
  default:
    return state
  }
}

export default user
