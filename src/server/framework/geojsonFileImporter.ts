import * as fs from "fs";
import { mapSync } from "event-stream";
import * as JSONStream from "JSONStream";
import { Layer } from "../dal/models/layer";
import { DAL } from "../dal/dal";
import { QueryTypes } from 'sequelize';

export class GeoJsonFileImporter {

    public static async importFile(filePath:string, newLayerName:string, projectId: number): Promise<Layer> {

        let newLayer = await DAL.createLayer(newLayerName, projectId, []);

        return new Promise<Layer>(function (resolve, reject) {
            fs.createReadStream(filePath)
                .pipe(JSONStream.parse('features.*'))
                .pipe(mapSync(function (data:any) {
                    GeoJsonFileImporter.InsertRow(newLayer.id.toString(), data.geometry);
                    return data;
                }))
                .on("end", function () {
                    console.log("GEOJSON file import complete!")
                    resolve(newLayer);
                })
        });
    }

    public static InsertRow(layerId:string, geometry: any) {

        let geoJsonString = JSON.stringify(geometry);

        // The location column is a point created from latitude and longitude.
        let sqlInsert = `INSERT INTO Layer_${layerId} ("geography") `
                        + ` VALUES (ST_SetSRID(ST_GeomFromGeoJSON('${geoJsonString}'), 4326))`;

        DAL.sequelize.query(sqlInsert, {
            type: QueryTypes.INSERT
        });
    }
}