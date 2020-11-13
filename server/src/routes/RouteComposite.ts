import {Application} from 'express';
import IRouteComponent from './IRouteComponent';

export default class RouteComposite implements IRouteComponent {
   private routes: IRouteComponent[];

   constructor(routes: IRouteComponent[]) {
      this.routes = routes;
   }

   /**
    * The routes that the component needs to apply. runs through the composite's list
    * @param app the server application
    */
   public route(app: Application): void {
      this.routes.forEach((route: IRouteComponent) => route.route(app));
   }
}
