import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema ({
    offline: {type: Boolean, default:true},
    online: {type: Boolean, default:false},
    deactivated: {type: Boolean, required: true, default: false},
    name_users: [{ type: Schema.Types.ObjectId, ref: 'user' }]
});

export default mongoose.model('onlineS', schema);