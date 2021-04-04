const errors = {
  signup: {
    invalidEmail: 'Make sure email is valid.',
    invalidPassword: 'Password must be at least 8 characters.',
    noMatchingPassword: 'Password does not match password confirmation.',
    missingManadatoryFields: 'Fields with * are mandatory.',
    selectCampus: 'Please select a campus first.',
    genericSignUp: 'Something went wrong signing up as a student.',
    fillInformation: 'Please fill the required information before proceeding.',
  },
  signin: {},
  profile: {
    emptyName: 'Your name cannot be empty. \nPlease retry with a valid change.',
    nameContainsNumber:
      'Your name cannot contain a number. \nPlease retry with a valid change.',
    phoneNonDigits:
      'Your phone number must only contain digits. \nPlease retry with a valid change.',
    currentlyUnavailable: 'Currently unavailable',
    userInfo: 'There was an problem accessing your user information.',
  },
  passwordReset: {
    provideEmail: 'Please provide a correct email',
    provideARegisteredEmail: 'This email is not attached to a known account, try a valid email',
  },
  editCampuses: {
    dataRetrievedIsNull: 'Data retrieved is null',
  },
};

export default errors;
