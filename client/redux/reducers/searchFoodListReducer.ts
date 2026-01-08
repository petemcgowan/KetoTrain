import { ActionType } from '../action-types/index'
import { SearchFoodListState } from '../../types/SearchListType'
const initialState: SearchFoodListState = []

const searchFoodListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.UPDATE_SEARCH_FOOD_LIST:
      return action.payload
    case ActionType.INIT_SEARCH_FOOD_LIST:
      return action.payload
    default:
      return state
  }
}

export default searchFoodListReducer
