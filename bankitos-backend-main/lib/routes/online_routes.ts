import { Application, Request, Response, NextFunction } from 'express';
import { OnlineController } from '../controllers/onlineController';
import  {authJWT}  from '../middlewares/authJWT';
import { AuthController } from '../controllers/authController';

export class OnlineRoutes {
    private online_controller: OnlineController = new OnlineController();
    private AuthJWT: authJWT = new authJWT();
    private auth_controller: AuthController = new AuthController();

    public route(app: Application) {
        
        
    }
}