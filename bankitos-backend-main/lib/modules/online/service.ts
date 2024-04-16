import { IOnline } from "./model";
import onlineS from './schema';
import { Types, FilterQuery } from 'mongoose';

export default class OnlineService {

    public async addUserAnState(userId: Types.ObjectId, onlineId: Types.ObjectId): Promise<void> { //POST
        try {
            const online = await onlineS.findById(onlineId);
            if(online!){
                throw new Error('State not found');
            }
        online.name_users.push(userId);
        await online.save();
        } catch (error) {
            throw error;
        }
    }

    public async deactivateState(online_paramsPartial: Partial<IOnline>, online_filter: FilterQuery<IOnline>): Promise<void> { //DELETE
        try {
            await onlineS.findOneAndUpdate(online_filter, online_paramsPartial);
        } catch (error) {
            throw error;
        }
    }

    public async filterOneState(query: any): Promise<IOnline | null> { //GET
        try {
            return await onlineS.findOne(query);
        } catch (error) {
            throw error;
        }
    }
}