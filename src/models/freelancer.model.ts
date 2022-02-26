import {Schema,model,Document} from 'mongoose';

//create interface
export interface bankDetails extends Document{
    bank_name:string;
    account_holder_name:string;
    ifsc_code:string;
    account_number:string;
};

export interface Freelancer extends Document {
    fullname: string;
    email: string;
    alternate_number?: string;
    whatsapp_number: string;
    city: string;
    whatsapp_number_link?: string;
    bank_account_details:bankDetails,
    upi_id:string
  };

//   interface Bank {
//     bank_name:string,
//     account_holder_name:string,
//     ifsc_code:string,
//     account_number:string
//   }

// const bankDetails = new Schema({
//     bank_name: {
//         type: String
//     },
//     account_holder_name: {
//         type: String
//     },
//     ifsc_code: {
//         type: String
//     },
//     account_number: {
//         type: String
//     }
// }, {
//     timestamps: true
// });

  const freelancerSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true
    },
    alternate_number: {
        type: String
    },
    whatsapp_number: {
        type: String,
        required:true
    },
    city: {
        type: String,
        required:true
    },
    whatsapp_number_link: {
        type: String
    },
    bank_account_details: {
            bank_name: {
                type: String
            },
            account_holder_name: {
                type: String
            },
            ifsc_code: {
                type: String
            },
            account_number: {
                type: String
            }
    },
    upi_id: {
        type: String,
        required:true
    },
  },{
      timestamps:true
  });

const Freelancer = model<Freelancer>('Freelancer',freelancerSchema);
export default Freelancer;