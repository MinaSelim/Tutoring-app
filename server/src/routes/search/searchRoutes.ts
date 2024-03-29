import {Application, Request, Response} from 'express';
import IRouteComponent from '../IRouteComponent';
import SearchManager from '../../services/managers/SearchManager';
import ITutor from '../../models/ITutor';
import IUser from '../../models/IUser';

export class SearchRoutes implements IRouteComponent {
   private searchManager: SearchManager;

   constructor() {
      this.searchManager = new SearchManager();
   }

   public route(app: Application): void {
      app.post('/search/tutorsForClass', async (req: Request, res: Response) => {
         try {
            const tutors: ITutor[] = await this.searchManager.getTutorsForClass(req.body.campus, req.body.class);
            res.status(200);
            res.send(tutors);
         } catch (error) {
            res.status(500);
            res.send(error);
         }
      });

      app.post('/search/classes', (req: Request, res: Response) => {
         try {
            const classes = this.searchManager.getUniversityClasses(req.body.university);
            res.status(200);
            res.send(classes);
         } catch (error) {
            res.status(500);
            res.send(error);
         }
      });

      app.post('/search/campuses', (req: Request, res: Response) => {
         try {
            const campuses = this.searchManager.getCampuses();
            res.status(200);
            res.send(campuses);
         } catch (error) {
            console.error(error);
            res.status(500);
            res.send(error);
         }
      });

      app.post('/search/basicUserInfo', async (req: Request, res: Response) => {
         try {
            const user: IUser = await this.searchManager.getBasicUserInfo(req.body.id);
            res.status(200);
            res.send(user);
         } catch (error) {
            res.status(500);
            res.send(error);
         }
      });
   }
}
