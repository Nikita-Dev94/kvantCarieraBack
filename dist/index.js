"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./api/auth/auth.routes"));
const users_routes_1 = __importDefault(require("./api/users/users.routes"));
const db_config_1 = require("./config/db.config");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Проверка подключения к базе данных
(0, db_config_1.testDBConnection)();
app.use(express_1.default.json()); // Для обработки JSON-запросов
// Подключаем маршруты аутентификации
app.use('/api/auth', auth_routes_1.default);
app.use('/api/users', users_routes_1.default);
// Маршрут по умолчанию
app.get('/', (req, res) => {
    res.send('Добро пожаловать в Express-приложение!');
});
// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
