export const getUserLoggedIn = (state) =>
  Object.keys(state.user.token || {}).length > 0
