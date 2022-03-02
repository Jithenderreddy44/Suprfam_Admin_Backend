import {Schema,model,Types} from 'mongoose';

//create interface
interface CampaignTypes{
    label:string;
    value:string;
    type:string;
};

interface CampaignDeliverables{
    label:string;
    value:string;
    type:string;
    no_of_static_post_links:number;
    no_of_static_post_insights:number;
    no_of_static_carousual_post_links:number;
    no_of_static_carousual_post_insights:number;
    no_of_reel_post_links:number;
    no_of_reel_post_insights:number;
    no_of_video_post_links:number;
    no_of_video_post_insights:number;
    no_of_story_links:number;
    no_of_story_insights:number;
    no_of_signup_screenshots:number;
    no_of_kyc_screenshots:number;
    no_of_playstore_screenshots:number;
    no_of_account_opening_screenshots:number;
    no_of_purchase_order_screenshots:number;
};

interface ProductsInfoo{
    name:string;
    review_count:number;
    description:string;
    link:string;
    image:string;
}

interface ProductDetails{
    products_info:ProductsInfoo []
}

interface SocialPerformance{
    min_followers:number;
    min_engagement_rate:number;
}

interface InfluencerDetails{
    product_details:ProductDetails,
    social_performance:SocialPerformance []
}

interface SampleAppStore{
    screenshot:string;
    desc:string;
}

 interface Campaign {
    cover_image:string;
    campaign_types:CampaignTypes [];
    campaign_description:string;
    campaign_deliverables:CampaignDeliverables [];
    end_date:Date;
    influencer_details:InfluencerDetails;
    min_influencers:number;
    name: string;
    order_delivery_screenshot:string;
    order_delivery_description:string;
    review_rating_screenshot:string;
    review_rating_description:string;
    sample_order_screenshot:string;
    sample_order_description:string;
    start_date:Date,
    sample_kyc_details:SampleAppStore [];
    sample_signup_details:SampleAppStore [];
    sample_purchase_order_details:SampleAppStore [];
    sample_review_rating_details:SampleAppStore [];
    sample_account_opening_details:SampleAppStore [];
    sample_static_carousal_post_details:SampleAppStore [];
    sample_static_post_details:SampleAppStore [];
    sample_reel_post_details:SampleAppStore [];
    sample_video_post_details:SampleAppStore [];
    sample_story_details:SampleAppStore [];
    sample_static_carousal_post_insights:SampleAppStore [];
    sample_static_post_insights:SampleAppStore [];
    sample_reel_post_insights:SampleAppStore [];
    sample_video_post_insights:SampleAppStore [];
    sample_story_insights:SampleAppStore [];
    target_location:string;
    terms_and_conditions:string;
  };

// campaign type schema
const campaignTypesSchema = new Schema<CampaignTypes>({
    label:{
        type:String,
        default:''
    },
    value:{
        type:String,
        default:''
    },
    type:{
        type:String,
        default:''
    }
});

//campaign Deliverables Schema
const campaignDeliverablesSchema = new Schema<CampaignDeliverables>({
    label:{
        type:String,
        default:''
    },
    value:{
        type:String,
        default:''
    },
    type:{
        type:String,
        default:''
    },
    no_of_static_post_links:{
        type:Number
    },
    no_of_static_post_insights:{
        type:Number
    },
    no_of_static_carousual_post_links:{
        type:Number
    },
    no_of_static_carousual_post_insights:{
        type:Number
    },
    no_of_reel_post_links:{
        type:Number
    },
    no_of_reel_post_insights:{
        type:Number
    },
    no_of_video_post_links:{
        type:Number
    },
    no_of_video_post_insights:{
        type:Number
    },
    no_of_story_links:{
        type:Number
    },
    no_of_story_insights:{
        type:Number
    },
    no_of_signup_screenshots:{
        type:Number
    },
    no_of_kyc_screenshots:{
        type:Number
    },
    no_of_playstore_screenshots:{
        type:Number
    },
    no_of_account_opening_screenshots:{
        type:Number
    },
    no_of_purchase_order_screenshots:{
        type:Number
    }
});

//productsInfoSchema
const productsInfoSchema = new Schema<ProductsInfoo>({
    name:{
        type:String,
        default:''
    },
    review_count:{
        type:Number,
        default:0
    },
    description:{
        type:String,
        default:''
    },
    link:{
        type:String,
        default:''
    },
    image:{
        type:String,
        default:''
    }
});

//productDetailsSchema
const productDetailsSchema = new Schema<ProductDetails>({
    products_info:{
        type:[productsInfoSchema],
        default:[]
    }
},{_id:false});

//socialPerformanceSchema
const socialPerformanceSchema = new Schema<SocialPerformance>({
    min_followers:{
        type:Number,
        default:0
    },
    min_engagement_rate:{
        type:Number,
        default:0
    }
})

//influencerDetails schema
const influencerDetailsSchema = new Schema<InfluencerDetails>({
    product_details:{
       type:productDetailsSchema,
       required:false
    },
    social_performance:{
        type:[socialPerformanceSchema]
    }
},{_id:false});

//sampleAppStore schema
const sampleAppStore = new Schema<SampleAppStore>({
    screenshot:{
        type:String,
        default:''
    },
    desc:{
        type:String,
        default:''
    }
});

//campaign schema
  const CampSchema = new Schema<Campaign>({
    campaign_types:{
        type:[campaignTypesSchema],
        default:[]
    },
    campaign_deliverables:{
        type:[campaignDeliverablesSchema],
        default:[]
    },
    campaign_description:{
        type:String,
        default:''
    },
    cover_image:{
     type:String,
     default:''
    },
    end_date:{
     type:Date
    },
    influencer_details:{
        type:influencerDetailsSchema
    },
    min_influencers:{
        type:Number,
        default:0,
        required:true
    },
    name:{
        type:String,
        trim:true,
        unique:true
    },
    order_delivery_screenshot:{
        type:String,
        default:''
    },
    order_delivery_description:{
        type:String,
        default:''
    },
    review_rating_screenshot:{
        type:String,
        default:''
    },
    review_rating_description:{
        type:String,
        default:''
    },
    sample_order_screenshot:{
        type:String,
        default:''
    },
    sample_order_description:{
        type:String,
        default:''
    },
    start_date:{
        type:Date
    },
    sample_kyc_details: {
        type: [sampleAppStore],
      },
      sample_signup_details: {
        type: [sampleAppStore],
      },
      sample_purchase_order_details: {
        type: [sampleAppStore]
      },
      sample_review_rating_details:{
        type:[sampleAppStore]
      },
      sample_account_opening_details: {
        type: [sampleAppStore]
      },
    sample_static_carousal_post_details:{
        type:[sampleAppStore]
    },
    sample_static_post_details:{
        type:[sampleAppStore]
    },
    sample_reel_post_details:{
        type:[sampleAppStore]
    },
    sample_video_post_details:{
        type:[sampleAppStore]
    },
    sample_story_details:{
        type:[sampleAppStore]
    },
    sample_static_carousal_post_insights:{
        type:[sampleAppStore]
    },
    sample_static_post_insights:{
        type:[sampleAppStore]
    },
    sample_reel_post_insights:{
        type:[sampleAppStore]
    },
    sample_video_post_insights:{
        type:[sampleAppStore]
    },
    sample_story_insights:{
        type:[sampleAppStore]
    },
    target_location:{
        type:String,
        default:''
    },
    terms_and_conditions:{
        type:String,
        default:''
    }
  });

const CampaignModel = model<Campaign>("Campaign",CampSchema);

// const cm = new CampaignModel({
//     name:'my campaign',
//     campaign_types:[{
//         label:'my label',
//         value:'my lvalue',
//         type:'ecommerce'
//     },
//     {
//         label:'my label',
//         value:'my lvalue',
//         type:'ecommerce'
//     }]
// });
// console.log("cm",cm);

export default CampaignModel;

//   const campaignData = new CampaignModel({
//     name: 'Oziva',
//     campaign_types:[{
//         "label": "Amazon Based",
//         "value": "Amazon Based",
//         "type": "eCom Review"
//     }],
//     campaign_deliverables: [{
//         "label": "Platform eComm Review",
//         "value": "Platform eComm Review"
//     }],
//     sample_screenshot: "screenshot-2021-12-17-at-3.28.26-pm-1639735689280.png",
//     sample_description: "PFB the sample order screenshot",
//     min_influencers: 30000,
//     cover_image: "filename-1639738043352.jpg",
//     campaign_description:"Brand: OZiv\nProduct: Personal care products \n Procedure: Order the product from the link given. Once received review it on Amazon after 4 to 5 days. \nNote: If the review is deleted then put the review on Google and you will receive full reimbursement.\n\n",
//     target_location:'PAN India',
//     start_date:"2022-02-28T00:00:00.000Z",
//     end_date:"2022-03-28T00:00:00.000Z",
//     review_rating_screenshot:"No file chosenscreenshot-2021-12-17-at-4.29.24-pm-1639738773316.png",
//     review_rating_description:"PFB the sample review screenshot",
//     terms_and_conditions:"Eligibility: Should have a minimum purchase of Rs 1500/- in the past 1 year.Note: If the review is deleted then put the review on Google and you will receive full ",
//     influencer_details:{
//         social_performance: [{
//             "min_followers": 0,
//             "min_engagement_rate": 0
//         }],
//         product_details: {
//             products_info: [{
//                 name: "Inner Glo Face Wash",
//                 review_count: 75,
//                 description: "",
//                 link: "https://www.amazon.in/OZiva-Brightening-Glycolic-Sandalwood-Correction/dp/B098L98S4Y/ref=sr_1_5?keywords=inner+glow+face+wash&qid=1637571676&qsid=262-4891316-0864266&sr=8-5&sres=B098L98S4Y%2CB09DSYXHKX%2CB08M682XPN%2CB06WRNV9W5%2CB09FX9FQ12%2CB093ZTRYW9%2CB09DL127XW%2CB098L7Q5RP%2CB083BVKZ8X%2CB096MHWR4C%2CB088B719LD%2CB00NARTS1C%2CB01GO5VRZG%2CB00EU4YX82%2CB089W938BR%2CB00V4L6JC2%2CB09FFQRT31%2CB09FY91BSK%2CB07X5YZWSP%2CB08PZ8HWKN&srpt=SKIN_CLEANING_AGENT",
//                 image: ""
//             }]
//         }
//     }
//   });

//   campaignData.save();

//   campaignData.save().then(() =>
//   {
//       console.log('data inserted!')
//   })

//   console.log(campaignData);

