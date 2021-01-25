import {Application, Request, Response} from 'express';
import IRouteComponent from '../IRouteComponent';
import StudentProfileManager from '../../services/managers/StudentProfileManager'
import StudentDatabaseFunctions from '../../database/studentDatabaseFunctions';
import IStudent from 'src/models/IStudent';

export class StudentProfileRoutes implements IRouteComponent {
    private studentProfileManager = new StudentProfileManager();
    private database: StudentDatabaseFunctions; 

    constructor() {
        this.database = new StudentDatabaseFunctions();
    }

    /**
     * This is the function that adds the profile routes to the function
     * @param app the application to set routes on
     */
    public route(app: Application): void {
        
        
        app.post('/profile/student/update', async (req: Request, res: Response) => {
            console.log('recevied request for student update');

            const studentCopy: IStudent = req.body;

            console.log('passed info', studentCopy)

            studentCopy.first_name = 'updated first name';
            studentCopy.last_name = 'updated last name';

            console.log('new info', studentCopy)

            try {
                // route logic 
                console.log('sending response');
                console.log('calling db function')
                const student: IStudent = (await this.database.updateUser(studentCopy)) as IStudent;
                console.log('received response')
                console.log('new student', student)
                res.status(200);
                res.send(student);
            } catch (error) {
                console.log('error with request')
                res.status(500);
                res.send(error);
            }
        });
    }
 }
 