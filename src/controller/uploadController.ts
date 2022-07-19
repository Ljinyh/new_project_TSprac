// upload controller
import { Response, Request } from "express";

export default {
    Get: async (req: Request, res: Response) => {
        res.send('연결 확인용 Get 요청');
    },

    // 이미지 업로더
    imageUploader: async (req: Request, res: Response) => {
        const image = req.files;
        const path = image?.map((img: { location: string; }) => img.location); // map 함수 사용. 여러개의 업로드 파일 URL을 배열로 출력.
        if (image === undefined) {
            return res
                .status(400)
                .send({ message: '이미지가 존재하지 않습니다.' });
        }
        res.status(200).send({
            message: '업로드 성공',
            data: { imgUrl: path },
        });
    },

    //이미지 하나 넣기 /image/single
    singleImage: async (req: Request, res: Response) => {
        const image = req.file;
        if (image === undefined) {
            return res
                .status(400)
                .json({ message: '이미지가 존재하지 않습니다.' });
        }
        const path = image.location;
        res.status(200).json({ imgUrl: path });
    },

    //이미지 배열로 넣기 URL : /image/array
    arrayImages: async (req: Request, res: Response) => {
        const image = req.files;
        const path = image.map((img: { location: string; }) => img.location); // map 함수 사용. 여러개의 업로드 파일 URL을 배열로 출력.
        if (image === undefined) {
            return res
                .status(400)
                .send({ message: '이미지가 존재하지 않습니다.' });
        }
        res.status(200).send({ message: '업로드 성공', imgUrl: path });
    },

    // multipart-form data /image/multi
    multiImages: async (req: Request, res: Response) => {
        const image: Array<string> = req.files;
        const firstImg = image?.image[0];
        const secondImg = image?.images;
        const secondPath = secondImg.map((img: { location: string; }) => img.location); // map 함수 사용. 여러개의 업로드 파일 URL을 배열로 출력.
        if (image === undefined) {
            return res
                .status(400)
                .send({ message: '이미지가 존재하지 않습니다.' });
        }
        const path = {
            firstImg: firstImg.location,
            secondImg: secondPath,
        };
        res.status(200).send({ message: '업로드 성공', imgUrl: path });
    },
};