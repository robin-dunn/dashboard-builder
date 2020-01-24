import { Model } from 'sequelize';

export class Project extends Model {
    public id!: number;
    public name!: string;
    public saved!: boolean;
}