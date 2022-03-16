import { Schema,model,Types} from 'mongoose';
// import User from '../models/user.model';
interface IReceiver
 {
    receiver:any
 };

interface IMesssage
{
    community:any;
    sender:any;
    messageType:string;
    message:string;
    contentUrl:string;
    fileName:string;
};

// const receiverSchema = new Schema<IReceiver>({
//     receiver:{
//         type:Types.ObjectId,
//         ref:'User',
//         required:true
//     }
// },{_id:false});

// message schema
const messageSchema = new Schema<IMesssage>({
    community:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Community'
    },
    sender:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    messageType:{
        type:String
    },
    message:{
        type:String
    },
    contentUrl:{
        type:String
    },
    fileName:{
        type:String
    }
},{
    timestamps:true
});
messageSchema.index({ room: 1 });

const MessageModel = model<IMesssage>('Message',messageSchema);
export default MessageModel;

// message:{
//     type:String,
//     required:true,
//     trim:true
// },
// type:{
//     type:String,
//     lowercase:true,
//     default:"text"
// },
// communityId:{
//     type:Types.ObjectId
// },
// sender:{
//    type:Types.ObjectId,
//    ref:'User',
//    required:true 
// },
// receivers :{
//     type:[receiverSchema],
//     default:[]
// }

