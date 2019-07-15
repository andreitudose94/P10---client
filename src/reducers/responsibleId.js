import {
  SET_RESPONSIBLES_ID,
} from 'constants/actions-type.js'

const responsibleId = (state = '', action) => {
  switch (action.type) {
    case SET_RESPONSIBLES_ID:
      return action.payload
    default:
      return state
  }
}

export default responsibleId
