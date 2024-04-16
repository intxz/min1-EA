import { Application, Request, Response, NextFunction } from 'express';
import { OnlineController } from '../controllers/onlineController';
import  {authJWT}  from '../middlewares/authJWT';
import { AuthController } from '../controllers/authController';

export class OnlineRoutes {
    private online_controller: OnlineController = new OnlineController();
    private AuthJWT: authJWT = new authJWT();
    private auth_controller: AuthController = new AuthController();

    public route(app: Application) {
        
        app.put('/state', (req: Request, res: Response) => {
            this.online_controller.addUserToState(req, res);
        });

        app.delete('/state/:id', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, (err?: any) => {
                if (err) {
                    return next(err); // Short-circuit if token verification fails
                }
                this.AuthJWT.isOwner(req, res, (err?: any) => {
                    if (err) {
                        return next(err); // Short-circuit if isOwner check fails
                    }
                    this.online_controller.deactivateState(req, res);
                }, 'State');
            });
        });

        app.get('/state/:id', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, (err?: any) => {
                if (err) {
                    return next(err); // Short-circuit if token verification fails
                }
                this.online_controller.getState(req, res);
            });
        });
    }
}