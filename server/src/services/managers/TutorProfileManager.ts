import ITutor from '../../models/ITutor';
import TutorDatabaseFunctions from '../../database/tutorDatabaseFunctions';

export default class TutorProfileManager {
   private tutorDatabaseFunctions: TutorDatabaseFunctions;

   constructor() {
      this.tutorDatabaseFunctions = new TutorDatabaseFunctions();
   }

   public updateInfo = async (tutor: ITutor): Promise<ITutor> => {
      const updatedTutor: ITutor = (await this.tutorDatabaseFunctions.updateUser(tutor)) as ITutor;
      updatedTutor.tutor_info = tutor.tutor_info; // alternatively send only generic info and have front end keep tutor info
      return updatedTutor;
   };

   public getChatrooms = async (idToken: string): Promise<string[]> => {
      let chatrooms: string[] = await this.tutorDatabaseFunctions.getChatrooms(idToken);
      chatrooms = chatrooms.filter((n) => n); // removes empty string
      return chatrooms;
   };

   public addChatroom = async (idToken: string, chatId: string): Promise<string[]> => {
      let chatrooms: string[] = await this.tutorDatabaseFunctions.addChatroom(idToken, chatId);
      chatrooms = chatrooms.filter((n) => n); // removes empty string
      return chatrooms;
   };

   public removeChatroom = async (idToken: string, chatId: string): Promise<string[]> => {
      let chatrooms: string[] = await this.tutorDatabaseFunctions.removeChatroom(idToken, chatId);
      chatrooms = chatrooms.filter((n) => n); // removes empty string
      return chatrooms;
   };
}
