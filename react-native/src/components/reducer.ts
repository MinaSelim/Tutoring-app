export default function reducer(state = [], action){
    if(action.type === 'usernameEntered')
        return [
            ...state,
            {
                username: action.payload.username 
            }
        ];
}