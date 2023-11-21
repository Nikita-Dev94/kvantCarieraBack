import { Sequelize } from '@sequelize/core';
import { User } from '../models/user.model';
import dotenv from 'dotenv';
import {ProgrammingDirections} from "../models/programmingDirections.model";
dotenv.config();
// Теперь process.env содержит ваши переменные окружения из файла .env
// Извлекаем переменные окружения
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
// Создание экземпляра Sequelize для подключения к базе данных
export const sequelize = new Sequelize(DB_NAME!, DB_USER!, DB_PASSWORD, {
    host: DB_HOST,
    port: parseInt(DB_PORT!, 10), // Преобразуем строку порта в число
    dialect: 'mysql',
    logging: console.log,
});

// Инициализация моделей
User.initialize(sequelize);
ProgrammingDirections.initialize(sequelize);

// Установка связей между моделями
const setupAssociations = () => {
    ProgrammingDirections.belongsTo(User, {
        foreignKey: 'lastModifiedBy',
        as: 'user'
    });

    // Здесь можно добавить другие связи
};



// Функция для проверки подключения
export const testDBConnection = async () => {

    try {
        await sequelize.authenticate();
        console.log('Подключение к базе данных успешно установлено.');
        // Вызываем функцию для настройки связей
        setupAssociations();
    } catch (error) {
        console.error('Не удалось подключиться к базе данных:', error);
    }
};


