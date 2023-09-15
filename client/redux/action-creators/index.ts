import { Dispatch } from 'redux'

import { ActionType } from '../action-types/index'

export const updateHasSeenIntro = (hasSeenIntro: boolean) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.UPDATE_HAS_SEEN_INTRO_VALUE,
      payload: hasSeenIntro,
    })
  }
}

export const updateSearchFoodList = (list) => ({
  type: ActionType.UPDATE_SEARCH_FOOD_LIST,
  payload: list,
})

export const initSearchFoodList = (list) => ({
  type: ActionType.INIT_SEARCH_FOOD_LIST,
  payload: list,
})

export const updateFavFoodList = (list) => ({
  type: ActionType.UPDATE_FAV_FOOD_LIST,
  payload: list,
})

export const initFavFoodList = (list) => ({
  type: ActionType.INIT_FAV_FOOD_LIST,
  payload: list,
})

export const updateEmailAddress = (email: string | null) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.UPDATE_EMAIL_ADDRESS,
      payload: email,
    })
  }
}
