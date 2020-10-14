import express from 'express';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import { AuthRoutes } from '../routes/AuthRoutes';
import * as dotenv from 'dotenv';

/**
 * This class represents the application. It is in charge of creating a configured application.
 */
export default class App {
   public app: express.Application;
   private authRoutes: AuthRoutes;

   /**
    * Constructs the class
    */
   constructor() {
      this.app = express();
      this.config();
      this.authRoutes = new AuthRoutes();
      this.authRoutes.route(this.app);
   }

   /**
    * Configures the class. TODO: create a config for Release, and a config for DEV
    */
   private config(): void {
      // support application/json type post data
      dotenv.config();
      this.app.use(bodyParser.json());
      //support application/x-www-form-urlencoded post data
      this.app.use(bodyParser.urlencoded({ extended: false }));
      this.app.use(expressSession({ secret: process.env.SESSION_SECRET, saveUninitialized: false, resave: false }));
      //TODO attach Redis to expressSession
   }
}
