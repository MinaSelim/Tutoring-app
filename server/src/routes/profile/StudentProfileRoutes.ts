import {Application, Request, Response} from 'express';
import IRouteComponent from '../IRouteComponent';
import StudentProfileManager from '../../services/managers/StudentProfileManager'
import IStudent from 'src/models/IStudent';

export class StudentProfileRoutes implements IRouteComponent {
    private studentProfileManager: StudentProfileManager;

    constructor() {
        this.studentProfileManager = new StudentProfileManager();
    }

    /**
     * This is the function that adds the profile routes to the function
     * @param app the application to set routes on
     */
    public route(app: Application): void {
        
        app.post('/profile/student/update', async (req: Request, res: Response) => {
            try {
                const student: IStudent = await this.studentProfileManager.updateInfo(req.body);
                console.log('updated info', student)
                res.status(200);
                res.send(student);
            } catch (error) {
                res.status(500);
                res.send(error);
            }
        });
    }
 }
 