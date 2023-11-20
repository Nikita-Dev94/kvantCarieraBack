export class BadRequestError extends Error {
    public status: number;
    public error: { message: string };

    constructor(message: string) {
        super(message);
        this.status = 400;
        this.error = { message: message };
    }
}

export class ConflictError extends Error {
    public status: number;
    public error: { message: string };

    constructor(message: string) {
        super(message);
        this.status = 409;
        this.error = { message: message };
    }
}
export class NotFoundError extends Error {
    public status: number;
    public error: { message: string };

    constructor(message: string) {
        super(message);
        this.status = 404;
        this.error = { message: message };
    }
}
export class InternalServerError extends Error {
    public status: number;
    public error: { message: string };

    constructor(message: string) {
        super(message);
        this.status = 500;
        this.error = { message: "Внутренняя ошибка сервера" };
    }
}