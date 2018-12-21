import { combineReducers, createStore } from "redux"
import map from './mapResucer'
import config from './configReducer'
import user from './userReducer'

var Reducers = combineReducers({
	map,
	config,
	user
})
export default store = createStore(Reducers);