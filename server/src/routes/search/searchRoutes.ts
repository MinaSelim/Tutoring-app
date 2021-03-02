import {Application, Request, Response} from 'express';
import IRouteComponent from '../IRouteComponent';
import SearchManager from '../../services/managers/SearchManager';
import ITutor from '../../models/ITutor';
import fs from 'fs';

export class SearchRoutes implements IRouteComponent {
   private searchManager: SearchManager;

   constructor() {
      this.searchManager = new SearchManager();
   }

   public route(app: Application): void {
      app.post('/search/allTutors', async (req: Request, res: Response) => {
         try {
            const tutors: ITutor[] = await this.searchManager.getAllTutors();
            res.status(200);
            res.send(tutors);
         } catch (error) {
            res.status(500);
            res.send(error);
         }
      });

      app.post('/search/classes', (req: Request, res: Response): void => {         
         try {
            const university: string = req.body.university;
            const filepath = './src/universityInformation/classes/' + university.toLowerCase() + '.json';
            
            fs.readFile(filepath, 'utf-8', (err, data) => {
               if (err) {
                  res.status(500);
                  res.send(err.message);
               } 
               else {
                  const classes = JSON.parse(data);
                  res.status(200);
                  res.send(classes.classes);
               }
            })
         } catch (error) {
            res.status(500);
            res.send(error);
         }
      });
   }
}
