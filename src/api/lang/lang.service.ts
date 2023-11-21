import {ProgrammingDirections} from "../../models/programmingDirections.model";
import * as Err from "../../utils/errors"

interface QueryParams {
    [key: string]: string | undefined | number | boolean;
}

export const getAllLangs = async (active: boolean = true) => {
    try {
        if (active) {
            return await ProgrammingDirections.findAll({
                where: {
                    isActive: true
                }
            });
        } else {
            return await ProgrammingDirections.findAll(
                {
                    where: {
                        isActive: false
                    }
                }
            );
        }
    } catch (e) {
        throw  new Err.BadRequestError("Некорекктный запрос")
    }

}

export const createLang = async (data: QueryParams) => {
    const query: QueryParams = {};
    for (const key in data) {
        // Проверяем, что значение не пустая строка и определено
        if (data[key] && data[key] !== '') {
            query[key] = data[key];
        }
    }
    try {
        const newLang = await ProgrammingDirections.create({
            name: query.name, description: query.description
        })
        return newLang
    } catch (e) {
        throw new Err.BadRequestError("Ошибка")
    }
}
const findLangByPK = async (id:number) => {
        return await ProgrammingDirections.findByPk(id)
}
export const updateLang = async (id:number, data:any, token:number = 2) => {
    try {
        const query: QueryParams = {};
        for (const key in data) {
            // Проверяем, что значение не пустая строка и определено
            if (data[key] && data[key] !== '') {
                query[key] = data[key];
            }
        }
        query.lastModifiedBy = token;
         const lang = await findLangByPK(id)
            // @ts-ignore
        return await lang.update(query)
    } catch (e) {
        throw new Err.NotFoundError("Направление не найдено")
    }

}

export const findLangById = async (id:number)=> {
try {
    return await findLangByPK(id)
}catch (e) {
    throw new Err.NotFoundError("Направление не найдено")
}
}