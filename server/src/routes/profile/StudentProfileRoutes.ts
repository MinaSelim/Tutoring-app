import {Application, Request, Response} from 'express';
import IRouteComponent from '../IRouteComponent';
import StudentProfileManager from '../../services/managers/StudentProfileManager';
import IStudent from 'src/models/IStudent';
import Guards from '../common/Guards';
import StudentDatabaseFunctions from '../../database/studentDatabaseFunctions';

export class StudentProfileRoutes implements IRouteComponent {
   private studentProfileManager: StudentProfileManager;
   private studentDatabaseFunctions: StudentDatabaseFunctions;

   constructor() {
      this.studentProfileManager = new StudentProfileManager();
      this.studentDatabaseFunctions = new StudentDatabaseFunctions();
   }

   /**
    * This is the function that adds the profile routes to the function
    * @param app the application to set routes on
    */
   public route(app: Application): void {
      app.post('/profile/student/update', async (req: Request, res: Response) => {
         try {
            Guards.loggedInStudentGuard(req);
            const student: IStudent = await this.studentProfileManager.updateInfo(req.body);
            res.status(200);
            res.send(student);
         } catch (error) {
            res.status(500);
            res.send(error);
         }
      });

      app.post('/profile/student/getChatrooms', async (req: Request, res: Response) => {
         try {
            // Guards.loggedInStudentGuard(req);
            const chatrooms: string[] = await this.studentProfileManager.getChatrooms(req.body.idToken);
            res.status(200);
            res.send(chatrooms);
         } catch (error) {
            res.status(500);
            res.send(error);
         }
      });

      app.post('/profile/student/addChatroom', async (req: Request, res: Response) => {
         try {
            // Guards.loggedInStudentGuard(req);
            const chatrooms: string[] = await this.studentProfileManager.addChatroom(req.body.idToken, req.body.chatId);
            res.status(200);
            res.send(chatrooms);
         } catch (error) {
            res.status(500);
            res.send(error);
         }
      });

      app.post('/profile/student/removeChatroom', async (req: Request, res: Response) => {
         try {
            // Guards.loggedInStudentGuard(req);
            const chatrooms: string[] = await this.studentProfileManager.removeChatroom(req.body.idToken, req.body.chatId);
            res.status(200);
            res.send(chatrooms);
         } catch (error) {
            res.status(500);
            res.send(error);
         }
      });
   }
}
