import { LOADING, CLOSING} from '../actions/loading'

export default function loading(state = true, action) {
  switch (action.type) {
    case LOADING:
      return state = true
    default:
        return state = false
  }
}
