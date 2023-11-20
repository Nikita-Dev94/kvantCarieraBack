import express from 'express';
import * as users from './users.controller';

const router = express.Router();

// Маршрут для получения всех  пользователя
router.get('/', users.getAll);

// Маршрут для получения пользователя с {{id}}
router.get('/:id', users.getById);

// Маршрут для получения пользователя с {{id}}
router.patch('/:id', users.updateUser);

export default router;