import ITutor from '../../models/ITutor';
import TutorDatabaseFunctions from '../../database/tutorDatabaseFunctions';

export default class TutorProfileManager {
    private tutorDatabaseFunctions: TutorDatabaseFunctions;

    constructor() {
        this.tutorDatabaseFunctions = new TutorDatabaseFunctions();
    }

    public updateInfo = async (tutor: ITutor): Promise<ITutor> => {
        const updatedTutor: ITutor = (await this.tutorDatabaseFunctions.updateUser(tutor)) as ITutor;
        updatedTutor.tutor_info = tutor.tutor_info; // alternatively send only generic info and have front end keep student info
        return updatedTutor; 
    }
}
