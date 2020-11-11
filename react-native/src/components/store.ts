import {createStore, combineReducers} from 'redux';

const AppReducers = combineReducers({});

const rootReducer = (state, action) => {
  return AppReducers(state, action);
};

const store = createStore(rootReducer);

export default store;
