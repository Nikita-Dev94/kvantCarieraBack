import express from 'express';
import * as LangController from './lang.controller';

const router = express.Router();

// Маршрут для регистрации пользователя
router.get('/', LangController.getAll);
router.get('/:id', LangController.getById);
router.post('/', LangController.createNewLang);
router.patch('/:id', LangController.updateLang);
// router.delete('/:id', LangController.updateLang);


export default router;