import {User} from "../../models/user.model";
import bcrypt from "bcrypt";
import * as Err from "../../utils/errors"
import jwt from "jsonwebtoken";
export const validate = async (email: string, password: string, firstName: string, lastName: string) => {
    if (!(email && password && firstName && lastName)) throw new Err.BadRequestError("Требуется email, пароль и ФИ пользователя.");
}
export const existingUser = async (email: string) => {
    const findUser = await User.findOne({where: {email}})
    if (findUser) {
        throw new Err.ConflictError("Пользователь с таким email уже существует.");
    } else {
        return findUser
    }
}
// Создание нового пользователя
export const createUser = async (email: string, password: string, firstName: string, lastName: string, middleName: string, admin:boolean = false) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
        email,
        passwordHash: hashedPassword,
        firstName,
        lastName,
        middleName: middleName || null, // Отчество может быть не указано
        registrationDate: new Date(), // Задаем текущую дату и время
        admin // По умолчанию пользователь не является администратором
    });
    return newUser
}

// Авторизация пользователя
export const checkData = async (email: string, password: string)=> {
    // Проверка наличия email и пароля
    if (!(email && password)) throw new Err.BadRequestError("Требуется email и пароль.")
}
export const checkUserData = async (email:string, password:string)=> {
    const user = await User.findOne({where: {email}});
    if (!user)  throw new Err.ConflictError("E-mail неправильный или такой пользователь не зарегистрирован");
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid)  throw new Err.ConflictError("Неверный пароль.");
    return user
}
export const generateToken = async  (user: User)=> {
    // Генерация токена аутентификации
    const secretKey: string | undefined = process.env.JWT_SECRET_KEY; // Установите свой секретный ключ в переменных окружения
    // @ts-ignore
    return jwt.sign({userId: user.id, isAdmin: user.admin}, secretKey, {expiresIn: '12h'});
}
