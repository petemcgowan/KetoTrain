import { Action } from '../actions/index'

const initialState = false

export const hasSeenIntro = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'UPDATE_HAS_SEEN_INTRO_VALUE':
      state = action.payload
      return state
    default:
      return state
  }
}
