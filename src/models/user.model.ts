import {Schema,model,Document,Types} from 'mongoose';
import * as jwt from 'jsonwebtoken';

//create interface

export interface Itokens extends Document {
    token:string
}

export interface IUser extends Document {
    email: string;
    otp:string;
    tokens:Types.DocumentArray<Itokens>
  };

  interface IUserDocument extends IUser, Document {
    generateAuthToken():Promise<string>
}

  const userSchema = new Schema<IUserDocument>({
    email: {
        type: String,
        required:true,
        unique:true
    },
    otp:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
  });

  userSchema.methods.generateAuthToken = async function ():Promise<string>
  {
    const user = this as IUserDocument;

    const token = jwt.sign({ _id:user._id.toString() },'thisismysecret');
    // user.tokens = user.tokens.concat({token})
    user.tokens.push({token});
    await user.save();
    return token;
  };

const User = model<IUserDocument>('User',userSchema);
export default User;