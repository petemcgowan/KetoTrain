import { ActionType } from '../action-types/index'
import { FoodListState } from '../../types/FoodDataType'
const initialState: FoodListState = []

const favFoodListReducer = (state: FoodListState = initialState, action) => {
  // Create favourites view array
  switch (action.type) {
    case ActionType.INIT_FAV_FOOD_LIST:
      return action.payload
    case ActionType.UPDATE_FAV_FOOD_LIST:
      // return [...state, action.payload];
      return action.payload
    default:
      return state
  }
}

export default favFoodListReducer
