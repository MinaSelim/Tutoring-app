const SignInReducer = (
  state = {email: '', firstName: '', lastName: '', phone: '', avatar: ''},
  action,
) => {
  // TODO Refactor to just have methods instead of a switch statement
  switch (action.type) {
    case 'USER_INFO':
      return {
        ...state,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        avatar: action.payload.avatar,
        phone: action.payload.phone,
      };

    default:
      return state;
  }
};

export default SignInReducer;
