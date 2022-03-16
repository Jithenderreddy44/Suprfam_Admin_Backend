import path from 'path';
import ejs from 'ejs';
import { readFileSync } from 'fs';
import { sendEmail } from './email.service';


interface UserDetails{
    email:string;
    otp:string;
}

export const sendEmailToUser = async (userDetails:UserDetails) =>
{
    let rootDir = __dirname.split('Backend')[0] + 'Backend/';
    let html = readFileSync(path.resolve(rootDir + 'src/templates/otp_verification.ejs'),{
     encoding: 'utf8',
     flag: 'r',
    });
    
   html = ejs.render(html,{
        otp:userDetails.otp
    });
    sendEmail({
        email:userDetails.email,
        subject:'Thanks for joining in ...',
        html:html
    })
};
