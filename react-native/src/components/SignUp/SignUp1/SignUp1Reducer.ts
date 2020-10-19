import * as Actions from '../../ActionsTypes';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
}

export default function SignUp1Reducer(initialState, action){
    switch(action.type){
        case Actions.SET_FIRST_NAME:
            return{
                firstName: initialState.firstName
            };
        case Actions.SET_LAST_NAME:
            return{
                lastName: initialState.lastName
            };
        case Actions.SET_EMAIL:
            return{
                email: initialState.email
            };
        case Actions.SET_PHONE:
            return{
                phone: initialState.phone
            };
        case Actions.SET_PASSWORD:
            return{
                password: initialState.password
            };
    }
}