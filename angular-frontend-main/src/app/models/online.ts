import * as mongoose from 'mongoose';

export interface IOnline {
    _id?: string; // Optional _id field
    offline: boolean;
    online: boolean;
    deactivate: boolean;
    name_users: string[];
}