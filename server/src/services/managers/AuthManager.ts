import firebase from 'firebase-admin';
import IUser from '../../models/IUser';
import Database from '../../database/database'

export default class AuthManager {
    private admin : typeof firebase
    private database: Database

    constructor(admin = firebase)
    {
        this.admin = admin;
        this.admin.initializeApp({
            credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS)
        })
        this.database = new Database(); //TODO properly implement this.
    }

    public registerUser = async (user : IUser) => {
        await this.database.addUserInUserCollection(user);
    }

    public loginUser  = async (token : string) => {
        let decodedToken = await this.admin.auth().verifyIdToken(token)
        let user = await this.database.getUserByFirebaseId(decodedToken.uid);
        return user;
    }
    

}
