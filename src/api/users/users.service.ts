import {User} from "../../models/user.model";
import {Op} from "@sequelize/core";
import * as Err from "../../utils/errors"


// Определяем тип для параметров запроса
interface QueryParams {
    [key: string]: string | undefined;
}

export const getAllUsers = async (data: any) => {
    const query: QueryParams = {};
    for (const key in data) {
        // Проверяем, что значение не пустая строка и определено
        if (data[key] && data[key] !== '') {
            query[key] = data[key];
        }
    }
    const users = await User.findAll({
        attributes: {
            exclude: ['passwordHash']
        },
        where: {
            [Op.and]: query
        }
    });

    return users;
}
export const getUser = async (id: number)=> {
    const user = await User.findByPk(id,{
        attributes: {
            exclude: ['passwordHash']
        }
    });
    if (!user) throw new Err.NotFoundError("Профиль пользователя не найден.");
    return await user.get();
}
export const updateUserInDb = async (id: number, dataForUpdate: any) => {
    const user = await User.findByPk(id,{
            attributes: {
                exclude: ['passwordHash']
            }
        });
    if (!user) throw new Err.NotFoundError("Профиль пользователя не найден.")

    return await user.update(dataForUpdate);
};