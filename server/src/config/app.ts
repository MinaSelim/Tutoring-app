import express from 'express';
import bodyParser from 'body-parser';
import expressSession from 'express-session'
import { AuthRoutes } from "../routes/AuthRoutes";

class App {
    public app: express.Application;
    private authRoutes: AuthRoutes = new AuthRoutes();

    constructor() {
        this.app = express();
        this.config();
        this.authRoutes.route(this.app);

    }
    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(expressSession({secret: process.env.SESSION_SECRET, saveUninitialized: false, resave:false}))
        //TODO attach Redis to expressSession
    }
}
export default new App().app;