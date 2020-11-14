import {Application} from 'express';
import {StudentAuthRoutes} from '../routes/auth/StudentAuthRoutes';
import {TutorAuthRoutes} from '../routes/auth/TutorAuthRoutes';
import RouteComposite from '../routes/RouteComposite';
import IRouteComponent from '../routes/IRouteComponent';

export default class RouteRoot implements IRouteComponent {
   /**
    * The routes that the component needs to apply
    * @param app the server application
    */
   public route(app: Application): void {
      // Create all the auth routes
      const authRoutes: RouteComposite = new RouteComposite([new StudentAuthRoutes(), new TutorAuthRoutes()]);

      // Add all the routes created to a root composite
      const rootRoutes: RouteComposite = new RouteComposite([authRoutes]);
      rootRoutes.route(app);
   }
}
