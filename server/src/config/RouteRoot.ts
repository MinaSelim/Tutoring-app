import {Application} from 'express';
import {StudentAuthRoutes} from '../routes/auth/StudentAuthRoutes';
import {TutorAuthRoutes} from '../routes/auth/TutorAuthRoutes';
import {StudentProfileRoutes} from '../routes/profile/StudentProfileRoutes';
import {TutorProfileRoutes} from '../routes/profile/TutorProfileRoutes';
import {ReviewsRoutes} from '../routes/reviews/ReviewsRoutes';
import {SearchRoutes} from '../routes/search/searchRoutes';
import RouteComposite from '../routes/RouteComposite';
import IRouteComponent from '../routes/IRouteComponent';

//Declaration merging for the session objects in student and tutor route
declare module 'express-session' {
   interface Session {
      firebase_uid: string;
      isLoggedIn: boolean;
      isLoggedInAsStudent: boolean;
      isLoggedInAsTutor: boolean;
   }
}

export default class RouteRoot implements IRouteComponent {
   /**
    * The routes that the component needs to apply
    * @param app the server application
    */
   public route(app: Application): void {
      const authRoutes: RouteComposite = new RouteComposite([new StudentAuthRoutes(), new TutorAuthRoutes()]);
      const profileRoutes: RouteComposite = new RouteComposite([new StudentProfileRoutes(), new TutorProfileRoutes()]);
      const reviewRoutes: RouteComposite = new RouteComposite([new ReviewsRoutes()]);
      const searchRoutes: RouteComposite = new RouteComposite([new SearchRoutes()]);

      // Add all the routes created to a root composite
      const rootRoutes: RouteComposite = new RouteComposite([authRoutes, profileRoutes, reviewRoutes, searchRoutes]);
      rootRoutes.route(app);
   }
}
