import fire from './Fire'
import { auth } from 'firebase'
import IUserLogin from '../../model/IUserLogin';
import {SERVER_LINK} from 'react-native-dotenv-milkywire'

export default class Login {
    private auth : auth.Auth;
    
    constructor(auth : auth.Auth = fire.auth()) {
        this.auth = auth;
    }
    

    public login = async (loginInfo : IUserLogin) => {
        await this.auth.signInWithEmailAndPassword(loginInfo.email, loginInfo.password);
        return await this.loginWithServer();
    }

    private loginWithServer = async() => {
        const user = this.auth.currentUser;
        const token = user && (await user.getIdToken());

        const res = await fetch(SERVER_LINK +"/auth/login", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'idtoken': token }),
            credentials: 'include'
          }).then((response) => response.json());
      
          return res;
    }

}
