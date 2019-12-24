import { Sequelize, DataTypes } from 'sequelize';
import { Layer } from "./models/layer"

export class DAL {
  public static init() {
    console.log('DASHBOARD_DB =', process.env.DASHBOARD_DB);
    console.log('DASHBOARD_DB_USER =', process.env.DASHBOARD_DB_USER);

    let databaseName = process.env.DASHBOARD_DB;
    let databaseUser = process.env.DASHBOARD_DB_USER;
    let databasePassword = process.env.DASHBOARD_DB_PASSWORD;

    const sequelize = new Sequelize(
        databaseName,
        databaseUser,
        databasePassword, {
            host: "localhost",
            dialect: "postgres"
        }
    );

    Layer.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      }
    }, {
      sequelize,
      tableName: "layers",
    });

    sequelize.sync({ force: true });
  }
}
