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

interface UpdateEmailAddressAction {
  type: ActionType.UPDATE_EMAIL_ADDRESS
  payload: string | null
}

interface SetHasEverLoggedRealFoodAction {
  type: ActionType.SET_HAS_EVER_LOGGED_REAL_FOOD
  payload: boolean
}

export type Action =
  | HasSeenIntroAction
  | searchFoodListReducer
  | favFoodListReducer
  | UpdateEmailAddressAction
  | SetHasEverLoggedRealFoodAction
