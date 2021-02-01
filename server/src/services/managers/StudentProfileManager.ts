import IStudent from '../../models/IStudent';
import StudentDatabaseFunctions from '../../database/studentDatabaseFunctions';

export default class StudentProfileManager {
   private studentDatabaseFunctions: StudentDatabaseFunctions;

   constructor() {
      this.studentDatabaseFunctions = new StudentDatabaseFunctions();
   }

   public updateInfo = async (student: IStudent): Promise<IStudent> => {
      const updatedStudent: IStudent = (await this.studentDatabaseFunctions.updateUser(student)) as IStudent;
      updatedStudent.student_info = student.student_info; // alternatively send only generic info and have front end keep student info
      return updatedStudent;
   };
}
