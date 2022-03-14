import {NextFunction, Request,Response} from 'express';

export const uploadFile = async (req:Request,res:Response) =>
{
    try
    {
    if(req.file)
    {
    //console.log(req.file);
    return res.status(200).send(req.file);
    }
    
    throw new Error("please provide file!")
    }
    catch(e:any)
    {
        res.status(400).send({
            error:e.message
        })
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

export const errorHandlingFunc = async (error:Error,req:Request,res:Response,next:NextFunction) =>
{
    res.status(400).send({
        error:error.message
    });
};