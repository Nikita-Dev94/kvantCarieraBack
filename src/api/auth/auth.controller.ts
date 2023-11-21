import {Request, Response} from 'express';
import {User} from "../../models/user.model";
import dotenv from 'dotenv';
import * as authService from './auth.service';
import * as Err from   "../../utils/errors";

dotenv.config();
// Теперь process.env содержит ваши переменные окружения из файла .env

// Контроллер для регистрации пользователя
export const register = async (req: Request, res: Response) => {
    try {
        const {email, password, firstName, lastName, middleName, admin = false} = req.body;

        // Валидация входных данных (можно добавить более сложную валидацию)
        await authService.validate(email,password,firstName,lastName)

        // Проверка, существует ли уже пользователь с таким email
        await authService.existingUser(email);

        // Создание нового пользователя
        const newUser: User = await authService.createUser(email, password, firstName, lastName, middleName, admin)
        // Отправка подтверждения регистрации
        return res.status(201).json({
            message: "Пользователь успешно зарегистрирован.", user: {
                id: newUser.id, email: newUser.email, firstName: newUser.firstName, lastName: newUser.lastName
                // Не возвращаем пароль, даже в хешированном виде
            }
        });
    } catch (error) {
        // Обработка ошибок, например, ошибка подключения к базе данных
        if (error instanceof Err.BadRequestError || error instanceof Err.ConflictError) {
            return res.status(error.status).json(error.error);
        }
        return res.status(500).send("Ошибка при регистрации пользователя.");
    }
};

// Контроллер для входа пользователя
export const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        // Проверяем наличие емэйла и пароля
        await authService.checkData(email, password)

        // Поиск пользователя по email, сравнение предоставленного пароля с хешированным паролем в базе данных
        const user = await authService.checkUserData(email, password)

        //Получение токена
        const token = await authService.generateToken(user)
        // Отправка данных пользователя и токена
        return res.json({
            message: "Успешный вход в систему.", token, user: {
                id: user.id, email: user.email
            }
        });
    } catch (error) {
        if (error instanceof Err.BadRequestError || error instanceof Err.ConflictError) {
            return res.status(error.status).json(error.error);
        }
        return res.status(500).send("Ошибка при попытке входа в систему.");
    }
};