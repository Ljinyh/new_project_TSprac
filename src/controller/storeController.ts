import { Response, Request } from "express";
import User from '../models/user';
import Savelist from '../models/saveList';
import Store from '../models/store';

export default {
    // 지도에 맛집 보여주기
    mapViewer: async (req:Request, res:Response) => {
        try {
            const allStore = await Store.find().exec();

            const storeMap = [];
            for (let i = 0; i < allStore.length; i++) {
                const findUser = await User.findById(allStore[i].userId);
                storeMap.push({
                    storeId : allStore[i]._id,
                    storeName: allStore[i].storeName,
                    address: allStore[i].address,
                    LatLon: allStore[i].LatLon,
                    nickname: findUser?.nickname,
                    faceColor: findUser?.faceColor,
                    eyes: findUser?.eyes,
                });
            }

            res.status(200).send({
                result: true,
                message: '지도에 맛집 보여주기 성공',
                storeMap: storeMap,
            });
        } catch (err) {
            console.log(err);
            res.status(400).send({
                result: false,
                message: '지도에 맛집 보여주기 실패',
            });
        }
    },

    // 맛집 생성 (첫 기록하기), 방장의 맛방에 맛집 추가까지
    createStore: async (req: Request, res: Response) => {
        const { user } = res.locals; // JWT 인증 정보
        const { storeName, comment, address, LatLon, imgURL, tag, star, price, recommendMenu } = req.body;
        const { roomId } = req.params;

        try {
            // 정보를 가게 DB에 저장
            const save = await Store.create({
                userId: user.userId,
                storeName,
                address,
                imgURL,
                LatLon,
                tag,
                star,
                price,
                recommendMenu,
                createdAt: Date.now(),
            });

            // 방장이 보고있던 roomId를 가져와서 savelist에 저장
            await Savelist.create({
                userId: user.userId,
                storeId: save._id,
                imgURL: imgURL,
                roomId,
                comment,
                createdAt: Date.now(),
            });
            res.status(200).send({
                result: true,
            });
        } catch (err) {
            console.log(err);
            res.send({ result: false, message: '맛집 기록 실패' });
        }
    },
};
