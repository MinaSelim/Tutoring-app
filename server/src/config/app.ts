import express from 'express';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import * as dotenv from 'dotenv';
import DatabaseConfig from '../config/DatabaseConfig';
import IRouteComponent from '../routes/IRouteComponent';
import RouteRoot from './RouteRoot';
/**
 * This class represents the application. It is in charge of creating a configured application.
 */
export default class App {
   public app: express.Application;
   private rootRoutes: IRouteComponent;

   /**
    * Constructs the class
    */
   constructor() {
    //   this.app = express();
    //   this.config();
    //   this.rootRoutes = new RouteRoot();
    //   this.rootRoutes.route(this.app);
   }

   /**
    * Configures the class. TODO: create a config for Release, and a config for DEV
    */
   private config(): void {
      // support application/json type post data
      dotenv.config();
      this.app.use(bodyParser.json());
      //support application/x-www-form-urlencoded post data
      this.app.use(bodyParser.urlencoded({extended: false}));
      this.app.use(expressSession({secret: process.env.SESSION_SECRET, saveUninitialized: false, resave: false}));
      Promise.resolve(DatabaseConfig.init());

      //TODO attach Redis to expressSession
   }
}
