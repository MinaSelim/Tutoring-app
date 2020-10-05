
import { Application, Request, Response } from 'express';
import AuthManager from '../services/managers/AuthManager';

export class AuthRoutes {

    private authManager = new AuthManager();

    public route(app: Application) {

        app.get('/auth/register', async (req: Request, res: Response) => {
            try
            {
                await this.authManager.registerUser(req.body);
                res.sendStatus(200);
            }
            catch (error)
            {
                res.status(500);
                res.send(error);
            }

        });

        app.get('/auth/login', async (req: Request, res: Response) => {
            try
            {
                let user = await this.authManager.loginUser(req.body.idToken);
                req.session.userId = user.id;
                req.session.isLoggedIn = true;
                res.sendStatus(200);
            }
            catch (error)
            {
                res.status(500);
                res.send(error);
            }

        });

    }
}