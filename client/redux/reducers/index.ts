import { combineReducers } from 'redux'

import searchFoodListReducer from './searchFoodListReducer'
import favFoodListReducer from './favFoodListReducer'
import { hasSeenIntro } from './HasSeenIntroReducer'
import { emailAddressReducer } from './emailAddressReducer'
import { hasEverLoggedRealFood } from './hasEverLoggedRealFoodReducer'

const rootReducer = combineReducers({
  hasSeenIntro,
  hasEverLoggedRealFood,
  searchFoodList: searchFoodListReducer,
  favFoodList: favFoodListReducer,
  emailAddress: emailAddressReducer,
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
