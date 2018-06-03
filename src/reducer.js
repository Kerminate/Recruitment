import { combineReducers } from 'redux'

function todos (state = []) {
  return state
}

function visiblity (state = []) {
  return state
}

const todoApp = combineReducers({
  todos,
  visiblity
})

export default todoApp
