import {createStore, combineReducers} from 'redux';
import SignInReducer from "./signIn/reducers/SignInReducer";

const AppReducers = combineReducers({
  SignInReducer
});

const rootReducer = (state, action) => {
  return AppReducers(state, action);
};

const store = createStore(rootReducer);

export default store;
