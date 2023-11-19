import { Request, Response } from 'express';
import {User} from "../../models/user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
// Теперь process.env содержит ваши переменные окружения из файла .env

/*import * as AuthService from './auth.service';*/

// Контроллер для регистрации пользователя
export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, firstName, lastName, middleName, admin } = req.body;

        // Валидация входных данных (можно добавить более сложную валидацию)
        if (!(email && password && firstName && lastName)) {
            return res.status(400).send("Требуется email, пароль и имя пользователя.");
        }

        // Проверка, существует ли уже пользователь с таким email
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).send("Пользователь с таким email уже существует.");
        }

        // Хеширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создание нового пользователя
        const newUser = await User.create({
            email,
            passwordHash: hashedPassword,
            firstName,
            lastName,
            middleName: middleName || null, // Отчество может быть не указано
            registrationDate: new Date(), // Задаем текущую дату и время
            admin: !!admin // По умолчанию пользователь не является администратором
        });

        // Отправка подтверждения регистрации
        return res.status(201).json({
            message: "Пользователь успешно зарегистрирован.",
            user: {
                id: newUser.id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName
                // Не возвращаем пароль, даже в хешированном виде
            }
        });
    } catch (error) {
        // Обработка ошибок, например, ошибка подключения к базе данных
        console.error(error);
        return res.status(500).send("Ошибка при регистрации пользователя.");
    }
};

// Контроллер для входа пользователя
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Проверка наличия email и пароля
        if (!(email && password)) {
            return res.status(400).send("Требуется email и пароль.");
        }

        // Поиск пользователя по email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send("E-mail неправильный или такой пользователь не зарегистрирован");
        }

        // Сравнение предоставленного пароля с хешированным паролем в базе данных
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).send("Неверный пароль.");
        }

        // Генерация токена аутентификации
        // @ts-ignore
        const secretKey : string = process.env.JWT_SECRET_KEY ; // Установите свой секретный ключ в переменных окружения
        const token = jwt.sign({ userId: user.id, email: user.email }, secretKey , { expiresIn: '1h' });

        // Отправка данных пользователя и токена
        return res.json({
            message: "Успешный вход в систему.",
            token,
            user: {
                id: user.id,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Ошибка при попытке входа в систему.");
    }
};