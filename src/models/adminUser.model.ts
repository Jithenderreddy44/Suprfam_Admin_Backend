import {Schema,model,Types,Document,Model} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

//interface
// interface ITokens extends Document {
//     token:string;
// };

interface IAdminUser extends Document {
    name:string;
    email:string;
    password:string;
    superAdmin:boolean;
};

interface IAdminUserDocument extends IAdminUser,Document{
    generateAuthToken():Promise<string>;
};

interface UserModel extends Model<IAdminUserDocument>
{
    findByCredentials(a:any,b:any):Promise<any>
}

const adminUserSchema = new Schema<IAdminUserDocument,UserModel>({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email: {
        type: String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    superAdmin:{
        type:Boolean,
        required:true
    }
  });

  //methods 
  adminUserSchema.methods.generateAuthToken = async function ():Promise<string>
  {
    const user = this as IAdminUserDocument;

    const token = jwt.sign({ userId:user._id.toString() },process.env.JWT_SECRET!);
    // user.tokens = user.tokens.concat({token})
    await user.save();
    return token;
  };
  
  adminUserSchema.methods.toJSON =  function ()
  {
    const userDoc = this;
    const user:any = userDoc.toObject();
    delete user.password;
    return user;
  };

  //statics
  adminUserSchema.static('findByCredentials', async function findByCredentials(email,password){      
    const user = await AdminUser.findOne({email});
    if(!user)
    {
        throw new Error("Unable to login!");
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch)
    {
        throw new Error("unable to login!");
    }
    return user;

  });

  //mongoose middleware
//   adminUserSchema.pre('save', async (next) =>
//   {
//     const {password} = this;
//     if(password)
//     {
//         //  bcrypt.hash(user.password,8);
//     const salt = await bcrypt.genSalt(8);
// 	const hash = await bcrypt.hash(password, salt);
//     }
//   });
//tokens:[{
//     token:{
//         type:String,
//         required:true
//     }
// }]

  const AdminUser = model<IAdminUserDocument,UserModel>("AdminUser",adminUserSchema);
  export default AdminUser;

