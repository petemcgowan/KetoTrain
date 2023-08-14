import { combineReducers } from 'redux'
import searchFoodListReducer from './searchFoodListReducer'
import favFoodListReducer from './favFoodListReducer'
import { hasSeenIntro } from './HasSeenIntroReducer'

const reducers = combineReducers({
  hasSeenIntro,
  searchFoodList: searchFoodListReducer,
  favFoodList: favFoodListReducer,
})

export default reducers

export type RootState = ReturnType<typeof reducers>
