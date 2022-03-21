import {Schema,model} from 'mongoose';

interface IAppliedCampaigns
{
    campaign_ids:any;
    freelancer_id:any;
};

const appliedCampaignsSchema = new Schema<IAppliedCampaigns>({
    campaign_ids:[{
        type:Schema.Types.ObjectId,
        ref:'Campaign',
        required:true
    }],
    freelancer_id:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{
    timestamps:true
});

const AppliedCampaigns = model("AppliedCampaign",appliedCampaignsSchema);
export default AppliedCampaigns;

