import express from 'express';
import * as AuthController from './auth.controller';

const router = express.Router();

// Маршрут для регистрации пользователя
router.post('/register', AuthController.register);

// Маршрут для входа пользователя
router.post('/login', AuthController.login);

export default router;