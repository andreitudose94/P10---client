export const getUserLoggedIn = (state) =>
  Object.keys(state.user.token || {}).length > 0

export const lang = () => (getState().intl || {}).locale || 'en'
