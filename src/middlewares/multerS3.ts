import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import { Request } from 'express'

AWS.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: process.env.region
});


export default class Multer {
	public static upload = multer({
		storage: multerS3({
            s3: new AWS.S3(),
            bucket: process.env.BucketName, // 버킷 이름
            // limits: { fileSize: 5 * 1024 * 1024 }, // 용량제한
            acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE, // 컨텐츠 타입 자동 지정
            key: function (request: Request, file: Express.Multer.File, done: any) {
                const fileName: string = `image/` + `${Date.now().toString()}_${file.originalname}`; //저장되는 파일명
            done(null, fileName)
            },
        }),
    });
    static image: any;
};
