import { Sequelize, DataTypes } from 'sequelize';
import { Layer } from "./models/layer"

export class DAL {

  private static _sequelize: Sequelize = null;

  public static get sequelize() {
    return this._sequelize;
  }

  public static init() {
    console.log('DASHBOARD_DB =', process.env.DASHBOARD_DB);
    console.log('DASHBOARD_DB_USER =', process.env.DASHBOARD_DB_USER);

    let databaseName = process.env.DASHBOARD_DB;
    let databaseUser = process.env.DASHBOARD_DB_USER;
    let databasePassword = process.env.DASHBOARD_DB_PASSWORD;

    this._sequelize = new Sequelize(
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
      sequelize: this.sequelize,
      tableName: "layers",
    });

    this._sequelize.sync({ force: true });
  }

  public static async createLayer(name:string, columnNames: string[]) : Promise<Layer> {
    console.log("Creating layer");
    
    let newLayer = await Layer.create({ name: name });

    let tableName = `Layer_${newLayer.id.toString()}`;

    let columns = [
      "id SERIAL PRIMARY KEY",
      "location GEOGRAPHY(Point)"
    ];

    // TODO: support different column types.
    columns = columns.concat(columnNames.map(colName => `"${colName}" TEXT`));

    let sqlCreateTable = `CREATE TABLE ${tableName} (${columns.join(",")})`;

    await this.sequelize.query(sqlCreateTable);

    return newLayer;
  }
}
