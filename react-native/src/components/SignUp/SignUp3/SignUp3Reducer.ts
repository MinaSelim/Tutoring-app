import * as Actions from '../../ActionsTypes';

export default function SignUp3Reducer(state = {university:''}, action){
    switch(action.type){
        case Actions.SET_UNIVERSITY:
            return{
                university: state.university
            };
    }
}