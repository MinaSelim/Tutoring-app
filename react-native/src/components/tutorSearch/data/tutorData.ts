import ITutor from '../../../../../server/src/models/ITutor';

const tutorData: ITutor[] = [
  {
    firebase_uid: '58694a0a',
    first_name: 'Alice',
    last_name: 'Annerson',
    email: 'lmao1@gmail.com',
    tutor_info: {
      chatrooms: ['comp232'],
      personRate: 49,
      groupRate: 10,
      numberOfReviews: 69,
      overallRating: 4.4,
    },
  },
  {
    firebase_uid: '58694a0b',
    first_name: 'Ben',
    last_name: 'Bennyson',
    email: 'lmao2@gmail.com',
    tutor_info: {
      chatrooms: [],
      personRate: 48,
      groupRate: 20,
      numberOfReviews: 420,
      overallRating: 4.2,
    },
  },
  {
    firebase_uid: '58694a0c',
    first_name: 'Charles',
    last_name: 'Charlington',
    email: 'lmao3@gmail.com',
    tutor_info: {
      chatrooms: [],
      personRate: 47,
      groupRate: 30,
      numberOfReviews: 42069,
      overallRating: 4.9,
    },
  },
];
export default tutorData;
