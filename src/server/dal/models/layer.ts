import { Model } from 'sequelize';

export class Layer extends Model {
    public id!: number;
    public name!: string;
}