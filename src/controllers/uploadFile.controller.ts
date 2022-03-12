import {Request,Response} from 'express';

export const uploadFile = async (req:Request,res:Response) =>
{
    if(req.file)
    {
    console.log(req.file);
    res.status(200).send(req.file);
    }
    
    // if(req.file)
    // {
    //     const fileStream = fs.createReadStream(req.file.path);
    //     s3.upload({
    //         Bucket: String(bucketName+bucketProfile),
    //         Body: fileStream,
    //         Key: req.file.filename+`.jpg`,
    //     }).promise()
    //     .then((result) =>
    //     {
    //         console.log(result);
    //     })
    //     .catch((e) =>
    //     {
    //         console.log("error",e);
    //     })
    // }

};