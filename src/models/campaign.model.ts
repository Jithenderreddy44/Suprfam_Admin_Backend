import {Schema,model} from 'mongoose';

//create interface
 interface Campaign {
    name: string;
    type: string;
    description: string;
    deliverables: string;
    count: number;
    targetLocation: string;
    startDate:string;
    endDate:string;
    ratingImage:string;
    ratingDescription:string
  };

  const CampSchema = new Schema<Campaign>({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    deliverables:{
        type:String,
        required:true
    },
    count:{
        type:Number,
        required:true
    },
    targetLocation:{
        type:String,
        required:true
    },
    startDate:{
        type:String,
        required:true
    },
    endDate:{
        type:String,
        required:true
    },
    ratingImage:{
        type:String,
        required:true
    },
    ratingDescription:{
        type:String,
        required:true
    }
  });

const Campaign = model<Campaign>("Campaign",CampSchema);

export default Campaign;

//   const campaignData = new Campaign({
//     name: 'new',
//     type: 'my campaign',
//     description: 'This is the description',
//     deliverables: 'deliverables',
//     count: 25,
//     targetLocation: 'hyderabad',
//     startDate:'01-01-2022',
//     endDate:'12-12-2022',
//     ratingImage:'random123',
//     ratingDescription:'This is the rating description!'

//   });

//   campaignData.save().then(() =>
//   {
//       console.log('data inserted!')
//   })

//   console.log(campaignData);

