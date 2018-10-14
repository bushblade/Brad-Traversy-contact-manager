import { combineReducers } from 'redux'
import contactReducer from './contactReducer' // imports the index.js in reducers

export default combineReducers({
  contact: contactReducer
})
