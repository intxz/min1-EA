import { Request, Response } from 'express';
import { IOnline } from '../modules/online/model';
import OnlineService from '../modules/online/service';
import * as mongoose from 'mongoose';

export class OnlineController {
    private online_service: OnlineService = new OnlineService();

    public async addUserToState(req: Request, res: Response) {
        try {
            if(req.body.name_users && req.body._id){
                const online_filter = { _id: req.params.id };
                const online_data = await this.online_service.filterOneState(online_filter);
                const objectid = new mongoose.Types.ObjectId(req.params.id);

                const online_params: IOnline = {
                    _id: objectid,
                    offline: req.body.offline,
                    online: req.body.online,
                    deactivate: req.body.online,
                    name_users: req.body.name_users || online_data.name_users
                }
                await this.online_service.addUserAnState(req.body.name_users, req.body._id)
                const new_online_data = await this.online_service.filterOneState(online_filter);
                // Send success response
                return res.status(200).json(new_online_data);
            }
            
        } catch (error) {
            console.error("Error updating:", error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async deactivateState(req: Request, res: Response) {
        try {
            if (req.params.id) {
                const online_filter = { _id: req.params.id };
                const online_data = await this.online_service.filterOneState(online_filter);
                if(online_data.deactivate===true){
                    return res.status(400).json({ error: 'Online not found' });
                }
            const online_paramsPartial: Partial<IOnline> = {
                deactivate: true,
            };

            await this.online_service.deactivateState(online_paramsPartial, online_filter);

            const new_user_data = await this.online_service.filterOneState(online_filter);
            // Send success response
            if (new_user_data.deactivate === true) {
                return res.status(200).json({ message: 'State Deleted' });
            }
        } else {
            // Send error response if ID parameter is missing
            return res.status(400).json({ error: 'Missing ID parameter' });
        }
    } catch (error) {
        // Catch and handle any errors
        console.error("Error updating:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
    }

    public async getState(req: Request, res: Response) {
        try{
            if (req.params.id) {
                const online_filter = { _id: req.params.id };
                const online_data = await this.online_service.filterOneState(online_filter);
                if(online_data.deactivate===true){
                    return res.status(400).json({ error: 'State not found' });
                }
                // Send success response
                return res.status(200).json(online_data);
            } else {
                return res.status(400).json({ error: 'Missing fields' });
            }
        }catch(error){
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}