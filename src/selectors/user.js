export const getUserLoggedIn = (state) =>
  Object.keys(state.user.token || {}).length > 0

export const getToken = () => getState().user.token

export const getTenantsList = () => getState().user.tenantsList

export const getUserRole = () => getState().user.role

export const lang = () => (getState().intl || {}).locale || 'en'
