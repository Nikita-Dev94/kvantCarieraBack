import { Request, Response, NextFunction } from 'express';
import { BadRequestError, ConflictError, NotFoundError, InternalServerError } from '../utils/errors'; // Импортируй твои классы ошибок

const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof BadRequestError) {
        return res.status(err.status).json(err.error);
    } else if (err instanceof ConflictError) {
        return res.status(err.status).json(err.error);
    } else if (err instanceof NotFoundError) {
        return res.status(err.status).json(err.error);
    } else if (err instanceof InternalServerError) {
        return res.status(err.status).json(err.error);
    }
    // Логирование ошибки, если это не ожидаемая ошибка
    console.error(err);
    // Отправка стандартного сообщения об ошибке
    res.status(500).json({ error: 'Internal Server Error' });
};

export default errorHandlerMiddleware;
