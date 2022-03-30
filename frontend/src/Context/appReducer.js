export default function appReducer(state = {}, action) {
  return (
    {
      SET_USER: { ...state, user: action.payload },
      SET_USER_LINKS: {
        ...state,
        userLinks: action.payload,
      },
      ADD_USER_LINK: {
        ...state,
        userLinks: [action.payload, ...state.userLinks],
      },
      SET_LINK: { ...state, link: action.payload },
      SET_IS_AUTH: { ...state, isAuth: action.payload },
      SET_LOADING: { ...state, loading: action.payload },
    }[action.type] || state
  );
}
