import {createStore, combineReducers} from 'redux';
import SignInReducer from '../components/SignIn/Reducers/SignInReducer';
import SignUp1Reducer from '../components/SignUp/SignUp1/SignUp1Reducer';
import SignUp2Reducer from '../components/SignUp/SignUp2/SignUp2Reducer';
import SignUp3Reducer from '../components/SignUp/SignUp3/SignUp3Reducer';

const AppReducers = combineReducers({
    SignInReducer,
    SignUp1Reducer,
    SignUp2Reducer,
    SignUp3Reducer
});

const rootReducer = (state, action) => {
    return AppReducers(state, action);
}

let store = createStore(rootReducer);

export default store;