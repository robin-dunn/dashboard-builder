import { Model } from 'sequelize';

export class Layer extends Model {
    public id!: number;
    public projectId: number;
    public name!: string;
    public isSystemLayer!: boolean;
}