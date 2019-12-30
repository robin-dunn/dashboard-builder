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

    this.syncDbModel();
  }

  private static async syncDbModel() {
    // Drop old layer tables named as Layer_1, Layer_2, etc.
    let layers = await Layer.findAll();

    layers.map(layer => this.sequelize.query(`DROP TABLE Layer_${layer.id};`));

    this.sequelize.sync({ force: true });
  }

  public static async createLayer(name:string, columnNames: string[]) : Promise<Layer> {

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

  public static async getLayerGeoJson(layerId: string) {

    let sqlSelectGeoJson = `SELECT json_build_object(
      'type', 'FeatureCollection',
      'metadata',  json_build_object(
        'minX', MIN(ST_X(location::geometry)),
        'minY', MIN(ST_Y(location::geometry)),
        'maxX', MAX(ST_X(location::geometry)),
        'maxY', MAX(ST_Y(location::geometry))
      ),
      'crs',  json_build_object(
        'type',      'name',
        'properties', json_build_object(
            'name', 'EPSG:4326'
        )
      ),
      'features', json_agg(
          json_build_object(
            'type',       'Feature',
            'id',         id,
            'geometry',   ST_AsGeoJSON(location)::json
          )
      )
    ) as geojson
    FROM Layer_${layerId};`

    let queryGeoJson = await this.sequelize.query(sqlSelectGeoJson);
    console.log(queryGeoJson);

    return new Promise<any[]>(function (resolve, reject) {
      if (queryGeoJson) {
        let geoJson = (queryGeoJson[0] as any[]).map(qr => qr.geojson)[0];
        resolve(geoJson);
      } else {
        reject();
      }
    });
  }
}
