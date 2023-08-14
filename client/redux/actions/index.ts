import { ActionType } from '../action-types'

interface HasSeenIntroAction {
  type: ActionType.UPDATE_HAS_SEEN_INTRO_VALUE
  payload: boolean
}

interface searchFoodListReducer {
  type: ActionType.UPDATE_SEARCH_FOOD_LIST
  payload: boolean
}

interface favFoodListReducer {
  type: ActionType.UPDATE_FAV_FOOD_LIST
  payload: boolean
}

export type IntroAction = HasSeenIntroAction
export type SearchFoodListAction = searchFoodListReducer
export type FavFoodListAction = favFoodListReducer
