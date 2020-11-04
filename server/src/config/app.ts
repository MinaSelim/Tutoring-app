import express from 'express';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import {StudentAuthRoutes} from '../routes/auth/StudentAuthRoutes';
import {TutorAuthRoutes} from '../routes/auth/TutorAuthRoutes';

import * as dotenv from 'dotenv';
import Database from '../database/database';
/**
 * This class represents the application. It is in charge of creating a configured application.
 */
export default class App {
   public app: express.Application;
   private studentAuthRoutes: StudentAuthRoutes; // TODO: Implement as composite pattern
   private tutorAuthRoutes: TutorAuthRoutes;

   /**
    * Constructs the class
    */
   constructor() {
      this.app = express();
      this.config();
      this.studentAuthRoutes = new StudentAuthRoutes();
      this.tutorAuthRoutes = new TutorAuthRoutes();
      this.studentAuthRoutes.route(this.app);
      this.tutorAuthRoutes.route(this.app);
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
      const db: Database = new Database();
      Promise.resolve(db.init());

      //TODO attach Redis to expressSession
   }
}
