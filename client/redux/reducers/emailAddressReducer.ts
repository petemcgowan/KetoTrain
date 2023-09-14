import { ActionType } from '../action-types'
import { Action } from '../actions/index'

export const emailAddressReducer = (
  state: string | null = null,
  action: Action
) => {
  switch (action.type) {
    case ActionType.UPDATE_EMAIL_ADDRESS:
      return action.payload
    default:
      return state
  }
}
