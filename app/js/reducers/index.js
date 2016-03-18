import { combineReducers } from 'redux'
import counter from './counter'
import generation from './generation'
import loading from './loading'

const rootReducer = combineReducers({
  counter,
  generation,
  loading
})

export default rootReducer
