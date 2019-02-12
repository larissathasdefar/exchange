import { SET_USER } from 'constants'

const initial = {
  currencies: [],
  photo: '',
  name: '',
}

const user = (state = initial, action, payload) => {
  switch (action.type) {
  case SET_USER:
    console.log('setting user', action, payload)
    return {
      ...state,
      currencies: [
        { code: 'USD', amount: 44.90 },
        { code: 'GPB', amount: 50.56 },
        { code: 'EUR', amount: 90.06 },
      ],
      photo: '',
      name: '',
    }
  default:
    return state
  }
}

export default user
