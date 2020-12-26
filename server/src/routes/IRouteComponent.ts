import {Application} from 'express';

export default interface IRouteComponent {
   /**
    * The routes that the component needs to apply
    * @param app the server application
    */
   // eslint-disable-next-line no-unused-vars
   route(app: Application): void;
}
