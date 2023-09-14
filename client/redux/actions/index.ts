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

// export type IntroAction = HasSeenIntroAction
// export type SearchFoodListAction = searchFoodListReducer
// export type FavFoodListAction = favFoodListReducer
// export type EmailAddressAction = UpdateEmailAddressAction
export type Action =
  | HasSeenIntroAction
  | searchFoodListReducer
  | favFoodListReducer
  | UpdateEmailAddressAction
