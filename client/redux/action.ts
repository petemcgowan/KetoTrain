export const UPDATE_HAS_SEEN_INTRO = 'UPDATE_HAS_SEEN_INTRO'

export const updateHasSeenIntro = (booleanValueToChange: boolean) => ({
  type: UPDATE_HAS_SEEN_INTRO,
  payload: {
    booleanValueToChange,
  },
})
