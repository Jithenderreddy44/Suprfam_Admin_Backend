import express from 'express';
import {uploadFile} from '../controllers/uploadFile.controller';
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

const router = express.Router();
// import S3 from 'aws-sdk/clients/s3';
// import fs from 'fs';

const bucketName = process.env.AWS_BUCKET_NAME!;
const bucketProfile = process.env.BUCKET_PROFILE!;
const region = process.env.AWS_REGION!;
const accessKeyId = process.env.AWS_ACCESS_KEY!;
const secretAccessKey =process.env.AWS_SECRET_KEY!;

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
});

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'video/x-flv': 'flv',
    'audio/mp3': 'mp3',
    'audio/mpeg': 'mp3',
    'video/mp4': 'mp4',
    'image/gif': 'gif',
    'application/x-mpegURL': 'm3u8',
    'video/3gpp': '3gp',
    'video/quicktime': 'mov',
    'video/x-msvideo': 'avi',
    'video/x-ms-wmv': 'wmv',
    'application/pdf': 'pdf',
  };
        // contentType:function(req,file,cb)
        // {
        //     cb(null,`image/jpg`)
        // },
const upload = multer({
    storage:multerS3({
        s3:s3,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        bucket:function(req,file,cb)
        {
            cb(null,bucketName+bucketProfile);
        },
        acl:'public-read',
        key:function(req,file,cb)
        {
            console.log("original name:",file.originalname);
            cb(null,file.originalname)
        }
    })
});

// const upload = multer({
//     dest:'uploads'
// });

router.post("/images",upload.single('image'),uploadFile);

export default router;