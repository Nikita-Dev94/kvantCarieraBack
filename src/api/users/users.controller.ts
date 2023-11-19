import {Request, Response} from 'express';
import {User} from "../../models/user.model";

export const getAll = async (req: Request, res: Response) => {
    try {
        res.status(200).send("asdasd")
    } catch (e) {
        return res.status(500).send("Ошибка при получении списка пользователей");
    }
}
export const getById = async (req: Request, res: Response) => {
    try {
        res.status(200).send("asdas234234234d")
    } catch (e) {
        return res.status(500).send("Ошибка при получении информации о пользователе");
    }
}
export const updateUser = async (req: Request, res: Response) => {
    try {
        let dataForUpdate = req.body;

        const id:number = +req.params.id
        const userProfilesData = await User.findByPk(id);
        if (userProfilesData) {

            const data = await userProfilesData.update(dataForUpdate);
            const { passwordHash, ...dataForResponse } = data.dataValues;
            res.status(200).json({
                "message": "Данные о пользователе обновлены",
                data: dataForResponse
            });
        } else {
            // Если профиль не найден
            return res.status(404).json({ message: "Профиль пользователя не найден." });
        }


    } catch (e) {
        return res.status(500).json({
            "message": "Ошибка при выполнении запроса"
        });
    }
}