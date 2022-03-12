import {Schema,model,Types} from 'mongoose';

//create interface
interface InviteSend{
   campaign_id:any;
    status:boolean
};

interface bankDetails {
    bank_name:string;
    account_holder_name:string;
    ifsc_code:string;
    account_number:number;
};

interface freelancer {
    fullName: string;
    email: string;
    alternate_number?: number;
    whatsapp_number: number;
    city: string;
    whatsapp_number_link?: string;
    bank_account_details:bankDetails,
    upi_id:string,
    invite_send:InviteSend []
  };

const inviteStatusSchema = new Schema<InviteSend>({
    campaign_id:{
        type:Types.ObjectId
    },
    status:{
        type:Boolean,
        default:false
    }
},{_id:false});

const bankDetailsSchema = new Schema<bankDetails>({
    bank_name: {
        type: String,
        required:true,
        trim:true
    },
    account_holder_name: {
        type: String,
        required:true,
        trim:true
    },
    ifsc_code: {
        type: String,
        required:true,
        trim:true
    },
    account_number: {
        type: Number,
        required:true,
        trim:true
    }
},{_id:false});

  const freelancerSchema = new Schema<freelancer>({
    fullName:{
        type: String,
        required: true,
        trim:true
    },
    email:{
        type: String,
        unique:true,
        required:true,
        trim:true
    },
    alternate_number:{
        type: Number
    },
    whatsapp_number:{
        type: Number,
        required:true
    },
    city: {
        type: String,
        required:true
    },
    whatsapp_number_link: {
        type: String
    },
    bank_account_details:{
        type:bankDetailsSchema
    },
    upi_id: {
        type: String,
        required:true
    },
    invite_send:{
        type:[inviteStatusSchema]
    }
  },{
      timestamps:true
  });

const freelancerModel = model<freelancer>('Freelancer',freelancerSchema);
export default freelancerModel;