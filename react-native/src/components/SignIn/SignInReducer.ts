import * as Actions from '../ActionsTypes';

const initialState = {
    inputUsername: '',
    inputPassword: ''
}

export default function SignInReducer(initialState, action){
    switch(action.type){
        case Actions.SET_INPUT_USERNAME:
            return{
                inputUsername: initialState.inputUsername
            };
        case Actions.SET_INPUT_PASSWORD:
            return{
                inputPassword: initialState.inputPassword
            };
    }
}