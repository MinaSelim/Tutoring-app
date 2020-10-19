import * as Actions from '../ActionsTypes';

const initialState = {
    inputEmail: '',
    inputPassword: ''
}

export default function SignInReducer(initialState, action){
    switch(action.type){
        case Actions.SET_INPUT_EMAIL:
            return{
                inputEmail: initialState.inputEmail
            };
        case Actions.SET_INPUT_PASSWORD:
            return{
                inputPassword: initialState.inputPassword
            };
    }
}