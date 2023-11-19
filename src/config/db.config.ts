import { Sequelize } from '@sequelize/core';
import { User } from '../models/user.model';
// Параметры подключения к базе данных
const dbName = 'kvantcariera'; // Название базы данных
const username = 'root';       // Имя пользователя
const password = 'ferarif500'; // Пароль

// Создание экземпляра Sequelize для подключения к базе данных
export const sequelize = new Sequelize(dbName, username, password, {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    logging: console.log, // Можно установить на false, чтобы отключить логирование запросов
});

// Инициализация моделей
User.initialize(sequelize);

// Установка связей между моделями
const setupAssociations = () => {
    /*UserProfiles.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user'
    });*/

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


