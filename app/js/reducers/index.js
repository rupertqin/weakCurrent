import { combineReducers } from 'redux'
import counter from './counter'
import generation from './generation'

const rootReducer = combineReducers({
  counter,
  generation
})

export default rootReducer
