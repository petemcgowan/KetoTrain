import {IntroAction} from '../actions/index';

const initialState = false; // set this to true to enable the intro slides

export const hasSeenIntro = (state = initialState, action: IntroAction) => {
  switch (action.type) {
    case 'UPDATE_HAS_SEEN_INTRO_VALUE':
      state = action.payload;
      return state;
    default:
      return state;
  }
};
