import {model,Schema,Types} from 'mongoose';

//interfaces
interface ISampleAppStore
{
    screenshot:string;
    description:string;
};

interface IBankDetails
{
    account_number:number;
    ifsc_code:string;
    account_holder_name:string;
    upi_id:string;
};

interface ICommonSchema
{
    platform:string;
    value:string;
};

interface Influencer
{
    fullName:string;
    email:string;
    contact_number:number;
    gender:string;
    city:string;
    category:string;
    socialmedia_profile_link:ICommonSchema [];
    followers:ICommonSchema [];
    poc:string;
    freelancer_id:any;
    freelancer_name:string;
    freelancer_email:string;
    campaign_id:any;
    campaign_name:string;
    status:string;
    ecom_account_name:ICommonSchema [];
    ecom_profile_link:ICommonSchema [];
    bank_details:IBankDetails;
    sample_account_opening_details:ISampleAppStore [];
    sample_purchase_order_details:ISampleAppStore [];
    review_screenshot:string;
    signup_screenshot:string;
    kyc_screenshot:string;
    sample_review_rating_details:ISampleAppStore [];
    sample_signup_details:ISampleAppStore [];
    sample_kyc_details:ISampleAppStore [];
    ecom_shopping:ICommonSchema [];
}

//common schema
const commonSchema = new Schema<ICommonSchema>({
    platform:{
        type:String,
        default:''
    },
    value:{
        type:String,
        default:''
    }
},{_id:false});

//influencer account details schema
const influencerAccountDetailsSchema = new Schema<IBankDetails>({
    account_number:{
        type:Number,
        trim:true
    },
    ifsc_code:{
        type:String,
        trim:true
    },
    account_holder_name:{
        type:String,
        trim:true
    },
    upi_id:{
        type:String,
        trim:true
    }
},{_id:false});

//sample app store
const sampleAppStore = new Schema<ISampleAppStore>({
    screenshot:{
        type:String
    },
    description:{
        type:String
    }
},{_id:false});

//influencer schema
const InfluencerSchema = new Schema<Influencer>({
    fullName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    contact_number:{
        type:Number,
        required:true,
        trim:true
    },
    gender:{
        type:String,
        required:true,
        trim:true
    },
    city:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:String,
        trim:true
    },
    socialmedia_profile_link:{
        type:[commonSchema]
    },
    followers:{
        type:[commonSchema]
    },
    poc:{
        type:String
    },
    freelancer_id:{
        type:Types.ObjectId
    },
    freelancer_name:{
        type:String
    },
    freelancer_email:{
        type:String
    },
    campaign_id:{
        type:Types.ObjectId
    },
    campaign_name:{
        type:String
    },
    status:{
        type:String,
        default:''
    },
    ecom_account_name:{
        type:[commonSchema]
    },
    ecom_profile_link:{
        type:[commonSchema]
    },
    bank_details:{
        type:influencerAccountDetailsSchema
    },
    sample_account_opening_details:{
        type:[sampleAppStore]
    },
    sample_purchase_order_details:{
        type:[sampleAppStore]
    },
    review_screenshot:{
        type:String
    },
    signup_screenshot:{
        type:String
    },
    kyc_screenshot:{
        type:String
    },
    sample_review_rating_details:{
        type:[sampleAppStore]
    },
    sample_signup_details:{
        type:[sampleAppStore]
    },
    sample_kyc_details:{
        type:[sampleAppStore]
    },
    ecom_shopping:{
        type:[commonSchema]
    }
},{
    timestamps:true
});
const InfluencerModel = model<Influencer>('Influencer',InfluencerSchema);

export default InfluencerModel;  