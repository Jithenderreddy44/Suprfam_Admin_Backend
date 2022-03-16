import {Schema,model} from 'mongoose';

interface IAppliedCampaigns
{
    campaign_id:any;
    freelancer_id:any;
};

const appliedCampaignsSchema = new Schema<IAppliedCampaigns>({
    campaign_id:{
        type:Schema.Types.ObjectId,
        ref:'Campaign',
        required:true
    },
    freelancer_id:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
});

const AppliedCampaigns = model("AppliedCampaign",appliedCampaignsSchema);
export default AppliedCampaigns;

