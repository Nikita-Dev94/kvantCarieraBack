import {Model, DataTypes, Sequelize} from '@sequelize/core';
import {sequelize} from "../config/db.config";

export class User extends Model {
    public id!: number;// Знак восклицания указывает, что это поле будет инициализировано Sequelize
    public email!: string;
    public passwordHash!: string;
    public registrationDate!: Date;
    public firstName!: string;
    public middleName!: string;
    public lastName!: string;
    public admin!: boolean;
    public Experience!: string;
    public ProgrammingLanguages!: string;
    public Frameworks!: string;
    public AdditionalInfo!: string;

    static initialize(sequelize: Sequelize) {
        this.init(
            {
                id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true,
                },
                email: {
                    type: new DataTypes.STRING(255),
                    allowNull: false,
                    unique: true,
                },
                passwordHash: {
                    type: new DataTypes.STRING(255),
                    allowNull: false,
                },
                registrationDate: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
                firstName: {
                    type: new DataTypes.STRING(255),
                    allowNull: false,
                },
                middleName: {
                    type: new DataTypes.STRING(255),
                    allowNull: true, // предполагается, что middleName может быть не указан
                },
                lastName: {
                    type: new DataTypes.STRING(255),
                    allowNull: false,
                },
                admin: {
                    type: DataTypes.BOOLEAN,
                    allowNull: true,
                    defaultValue: false,
                },
                experience: {
                    type: new DataTypes.TEXT(),
                    allowNull: true, // Делает поле необязательным
                    defaultValue: null,
                },
                programmingLanguages: {
                    type: DataTypes.TEXT,
                    allowNull: true, // Делает поле необязательным
                    defaultValue: null,
                },
                frameworks: {
                    type: new DataTypes.TEXT(),
                    allowNull: true, // Делает поле необязательным
                },
                additionalInfo: {
                    type: new DataTypes.TEXT(),
                    allowNull: true, // Делает поле необязательным
                }
            }, {
                sequelize,
                tableName: 'users',
                timestamps: false, // Отключаем timestamps, если они не используются
            });
    }
}

