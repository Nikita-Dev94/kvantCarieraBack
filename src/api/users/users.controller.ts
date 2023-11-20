import {Request, Response} from 'express';
import * as userService from './users.service';
import * as Err from "../../utils/errors";


export const getAll = async (req: Request, res: Response) => {
    try {
        const data = req.query
        const users = await userService.getAllUsers(data)
        res.json(users)
    } catch (e) {
        if (e instanceof Err.InternalServerError) {
            return res.status(e.status).json(e.error);
        }
    }
}
export const getById = async (req: Request, res: Response) => {
    try {
        const id: number = +req.params.id;
        const user = await userService.getUser(id)
        res.json(user)
    } catch (e) {
        if (e instanceof Err.NotFoundError || e instanceof Err.InternalServerError) {
            return res.status(e.status).json(e.error);
        }
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const id: number = +req.params.id;
        const dataForUpdate = req.body;
        const updatedUser = await userService.updateUserInDb(id, dataForUpdate);
        res.json({
            message: "Данные о пользователе обновлены", data: updatedUser
        });
    } catch (e) {
        if (e instanceof Err.NotFoundError || e instanceof Err.InternalServerError) {
            return res.status(e.status).json(e.error);
        }
    }
};

