import sgMail from '@sendgrid/mail';

const sendgridApiKey = process.env?.SENDGRID_API_KEY_2!;

sgMail.setApiKey(sendgridApiKey);

type emailObj = {
    email:string;
    subject:string;
    html:string;
}

export const sendEmail = ({email,subject,html}:emailObj) =>
{
    sgMail.send({
        to:email,
        from:'support@suprfam.com',
        subject,
        html
    })
    .then((res) =>
    {
        console.log('email has sent!');
    })
    .catch((e) =>
    {
        console.log("error",e.message);
    })
};

