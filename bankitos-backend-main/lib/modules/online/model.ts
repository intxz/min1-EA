import * as mongoose from 'mongoose';

export interface IOnline {
    _id?: mongoose.Types.ObjectId; // Optional _id field
    offline: boolean;
    online: boolean;
    deactivate: boolean;
    name_users: mongoose.Types.ObjectId[];
}