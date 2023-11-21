import {NextFunction, Request, Response} from 'express';
import * as langService from './lang.service';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let isActive: boolean = true;
        if (req.query.active) isActive = JSON.parse(<string>req.query.active)
        const langs =  await langService.getAllLangs(isActive)
        res.json(langs)
    } catch (e) {
        next(e)
    }
}
export const createNewLang = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newLang = await langService.createLang(req.body)
        res.json({
            message: "Новое направление успешно создано", direction: {
                id: newLang.id, name: newLang.name, description: newLang.description
            }
        });
    } catch (e) {
        next(e)
    }

}

export const updateLang = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const id :number = +req.params.id
        const data: any = req.body;
        // Надо третьим аргументом передавать токен, и расшифровывать его, что бы получить id пользовател изменившего данные
        const updatingLang = await langService.updateLang(id, data, 2)
        res.json(updatingLang)
    } catch (e) {
        next(e)
    }
}
export const getById = async (req: Request, res: Response, next: NextFunction)=> {
    try {
       const id: number = +req.params.id
        const lang = await langService.findLangById(id)
        console.log(lang)
        res.json(lang)
    } catch (e) {
        next(e)
    }
}