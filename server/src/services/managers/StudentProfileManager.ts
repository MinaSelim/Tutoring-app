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

   public getChatrooms = async (idToken: string): Promise<string[]> => {
      let chatrooms: string[] = await this.studentDatabaseFunctions.getChatrooms(idToken);
      chatrooms = chatrooms.filter((n) => n); // removes empty string
      return chatrooms;
   };

   public addChatroom = async (idToken: string, chatId: string): Promise<string[]> => {
      let chatrooms: string[] = await this.studentDatabaseFunctions.addChatroom(idToken, chatId);
      chatrooms = chatrooms.filter((n) => n); // removes empty string
      return chatrooms;
   };

   public removeChatroom = async (idToken: string, chatId: string): Promise<string[]> => {
      let chatrooms: string[] = await this.studentDatabaseFunctions.removeChatroom(idToken, chatId);
      chatrooms = chatrooms.filter((n) => n); // removes empty string
      return chatrooms;
   };

   public updateCampus = async (idToken: string, campus: string): Promise<void> => {
      await this.studentDatabaseFunctions.updateCampus(idToken, campus);
   };
}
