import {Model, DataTypes, Sequelize} from '@sequelize/core';

export class ProgrammingDirections extends Model {
    public id!: number;// Знак восклицания указывает, что это поле будет инициализировано Sequelize
    public name!: string;
    public description!: string;
    public totalTestsTaken!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
    public isActive!: boolean;
    public lastModifiedBy!: number;

    static initialize(sequelize: Sequelize) {
        this.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: new DataTypes.STRING(255),
                    allowNull: false,
                    unique: true
                },
                description: {
                    type: new DataTypes.TEXT(),
                    allowNull: true // Допускается null, так как описание может быть необязательным
                },
                totalTestsTaken: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0 // Значение по умолчанию должно быть 0 для счетчика
                },
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW
                },
                isActive: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: true // Дефолтное значение - активно
                },
                lastModifiedBy: {
                    type: DataTypes.INTEGER,
                    allowNull: true, // Может быть null, если изменений не было
                    defaultValue: null // Значение по умолчанию - null
                }
            }, {
                sequelize,
                tableName: 'programmingdirections',
                timestamps: true, // Включаем timestamps, если хотим, чтобы Sequelize автоматически обрабатывал поля createdAt и updatedAt
            });
    }
}

