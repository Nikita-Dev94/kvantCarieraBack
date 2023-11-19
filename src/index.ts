import express, { Express } from 'express';
import authRoutes from './api/auth/auth.routes';
import usersRoute from './api/users/users.routes';
import { sequelize, testDBConnection } from './config/db.config';
const app: Express = express();
const PORT = process.env.PORT || 3001;


// Проверка подключения к базе данных
testDBConnection();


app.use(express.json()); // Для обработки JSON-запросов

// Подключаем маршруты аутентификации
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoute);

// Маршрут по умолчанию
app.get('/', (req, res) => {
    res.send('Добро пожаловать в Express-приложение!');
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
