import * as Actions from '../../ActionsTypes';

export default function SignUp2Reducer(state = {userType:''}, action){
    switch(action.type){
        case Actions.SET_USER_TYPE:
            return{
                userType: state.userType
            };
    }
}