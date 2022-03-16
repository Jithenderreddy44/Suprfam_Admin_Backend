import { Schema,model,Types} from 'mongoose';

interface ICommunity
{
    admin:any;
    title:string;
    participants:any [];
    communityType:string;
};

const communitySchema = new Schema<ICommunity>({
    admin:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String
    },
    participants:[{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:true
    }],
    communityType:{
        type:String
    }
},{
    timestamps:true
});
communitySchema.index({ mango: 1 });

// model
const communityModel = model<ICommunity>('Community',communitySchema);
export default communityModel;


// interfaces
// interface User
// {
//     displayName:string;
//     email:string;
//     photoUrl:string;
// }

// interface Message{
//     message:string;
//     timestamp:string;
//     user:User
// }; 
// interface IParticipant{
//     participant:any;
// };

// // message user schema
// const userSchema = new Schema<User>({
//     displayName:{
//         type:String,
//         trim:true
//     },
//     email:{
//         type:String,
//         trim:true
//     },
//     photoUrl:{
//         type:String,
//         trim:true
//     }
// });

// // message schema
// const messageSchema = new Schema<Message>({
//     message:{
//         type:String,
//         trim:true
//     },
//     timestamp:{
//         type:String
//     },
//     user:{
//         type:userSchema
//     }
// },{_id:false});

// schemas

// const participantSchema = new Schema({
//     //participant:{
//         type:Types.ObjectId,
//         ref:'User',
//         required:true
//     //}
// },{_id:false});


// const communitySchema = new Schema<IRoom>({
//     name:{
//         type:String,
//         trim:true,
//         required:true,
//         lowercase:true
//     },
//     profile_pic:{
//         type:String,
//     },
//     description:{
//     type:String,
//     trim:true
//     },
//     type:{
//         type:String,
//         trim:true,
//         required:true,
//         lowercase:true
//     },
//     privateCommunity:{
//         type:Boolean,
//         required:true
//     },
//     communityAdmin:{
//         type:Types.ObjectId,
//         required:true,
//         _id:false
//     },
//     participants:{
//         type:[participantSchema]
//     }
// },
// {
//     timestamps:true
// });
