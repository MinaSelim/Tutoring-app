import {Application, Request, Response} from 'express';
import IRouteComponent from '../IRouteComponent';
import TutorProfileManager from '../../services/managers/TutorProfileManager';
import ITutor from 'src/models/ITutor';

export class TutorProfileRoutes implements IRouteComponent {
   private tutorProfileManager: TutorProfileManager;

   constructor() {
      this.tutorProfileManager = new TutorProfileManager();
   }

   /**
    * This is the function that adds the profile routes to the function
    * @param app the application to set routes on
    */
   public route(app: Application): void {
      app.post('/profile/tutor/update', async (req: Request, res: Response) => {
         try {
            const tutor: ITutor = await this.tutorProfileManager.updateInfo(req.body);
            res.status(200);
            res.send(tutor);
         } catch (error) {
            res.status(500);
            res.send(error);
         }
      });
   }
}
