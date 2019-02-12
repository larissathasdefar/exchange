import { SET_USER } from 'constants'

const initial = {
  currencies: [],
  photo: '',
  name: '',
}

const user = (state = initial, action) => {
  switch (action.type) {
  case SET_USER:
    return { ...state, ...action.user }
  default:
    return state
  }
}

export default user
