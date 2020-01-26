import { Sequelize, DataTypes } from 'sequelize';
import { Layer } from "./models/layer"
import { Project } from './models/project';

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
            dialect: "postgres",
            logging: false
        }
    );

    Project.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      saved: {
        type: DataTypes.BOOLEAN
      }
    }, {
      sequelize: this.sequelize,
      tableName: "projects",
    });

    Layer.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      isSystemLayer: {
        type: DataTypes.BOOLEAN
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      projectId: {
        type: DataTypes.INTEGER.UNSIGNED
      }
    }, {
      sequelize: this.sequelize,
      tableName: "layers",
    });

    Layer.belongsTo(Project, { foreignKey: "projectId" });

    this.syncDbModel();
  }

  private static async syncDbModel() {
    // Drop old layer tables named as Layer_1, Layer_2, etc.
    let layers = await Layer.findAll();
    layers.map(layer => this.sequelize.query(`DROP TABLE Layer_${layer.id};`));

    await this.sequelize.sync({ force: true });

    console.log("SEED TEST DATA");
    await Project.create({ name: "Test Proj 1", saved: true });
    await Project.create({ name: "Test Proj 2", saved: true });
    await Project.create({ name: "Test Proj 3", saved: true });
  }

  public static async createLayer(name:string, isSystemLayer:boolean, columnNames: string[], projectId?:number) : Promise<Layer> {

    let layerModel = {
      name: name,
      isSystemLayer: isSystemLayer,
      projectId: isSystemLayer ? null : projectId
    };

    let newLayer = await Layer.create(layerModel);

    let tableName = `Layer_${newLayer.id.toString()}`;

    let columns = [
      "id SERIAL PRIMARY KEY",
      "geography GEOGRAPHY"
    ];

    columns = columns.concat(columnNames.map(colName => `"${colName}" TEXT`));

    let sqlCreateTable = `CREATE TABLE ${tableName} (${columns.join(",")})`;

    await this.sequelize.query(sqlCreateTable);

    return newLayer;
  }

  public static async getLayerGeoJson(layerId: string) {

    let sqlSelectGeoJson = `SELECT json_build_object(
      'type', 'FeatureCollection',
      'metadata',  json_build_object(
        'minX', MIN(ST_X(geography::geometry)),
        'minY', MIN(ST_Y(geography::geometry)),
        'maxX', MAX(ST_X(geography::geometry)),
        'maxY', MAX(ST_Y(geography::geometry))
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
            'geometry',   ST_AsGeoJSON(geography)::json
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
