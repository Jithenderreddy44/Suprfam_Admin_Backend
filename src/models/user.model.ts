import {Schema,model,Document} from 'mongoose';

// interfaces 
interface IBankDetails
{
  bank_name:string;
  account_holder_name:string;
  ifsc_code:string;
  account_number:number;
}

 interface IUser extends Document {
    type:string;
    email: string;
    otp:string;
    fullName:string;
    whatsapp_number:number;
    city:string;
    bank_account_details:IBankDetails
    upi_id:string;
  };

  //schemas
  const bankDetailsSchema = new Schema<IBankDetails>({
    bank_name: {
        type: String,
        trim:true
    },
    account_holder_name: {
        type: String,
        trim:true
    },
    ifsc_code: {
        type: String,
        trim:true
    },
    account_number: {
        type: Number,
        trim:true
    }
},{_id:false});


  const userSchema = new Schema<IUser>({
    type:{
      type:String,
      default:'user'
    },
    email: {
        type: String,
        required:true,
        unique:true
    },
    otp:{
        type:String,
        required:true
    },
    fullName:{
      type: String,
      trim:true
  },
  whatsapp_number:{
      type: Number,
      trim:true
  },
  city: {
      type: String,
      trim:true
  },
  bank_account_details:{
      type:bankDetailsSchema
  },
  upi_id: {
      type: String
  }
  });

  // userSchema.methods.generateAuthToken = async function ():Promise<string>
  // {
  //   const user = this as IUserDocument;

  //   const token = jwt.sign({ _id:user._id.toString() },'thisismysecret');
  //   // user.tokens = user.tokens.concat({token})
  //   user.tokens.push({token});
  //   await user.save();
  //   return token;
  // };

const User = model<IUser>('User',userSchema);
export default User;