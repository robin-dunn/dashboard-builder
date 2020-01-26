import * as fs from "fs";
import * as csv from "fast-csv";
import { DAL } from "../dal/dal";
import { QueryTypes } from 'sequelize';
import { Layer } from "../dal/models/layer";

export class CsvFileImporter {

    public static async importFile(filePath:string, newLayerName:string, isSystemLayer:boolean, projectId?: number): Promise<Layer> {

        // TODO: handle CSV files with no column headers
        let columnNames = await this.getColumnNamesAsync(filePath);
        let latitudeColumnName = columnNames.find(colName => /latitude/gi.test(colName));
        let longitudeColumnName = columnNames.find(colName => /longitude/gi.test(colName));
        let sqlColumnNames = columnNames.filter(propName => propName !== latitudeColumnName && propName !== longitudeColumnName);

        let rowsBatch = [];
        const rowsBatchSize = 100;

        let newLayer = await DAL.createLayer(newLayerName, isSystemLayer, sqlColumnNames, projectId);
        let layerId = newLayer.id.toString();

        return new Promise<Layer>(function (resolve, reject) {
            fs.createReadStream(filePath)
                .pipe(csv.parse({ headers: true, trim: true }))
                .on('data', (row) => {
                    row[latitudeColumnName] = parseFloat(row[latitudeColumnName]),
                    row[longitudeColumnName] = parseFloat(row[longitudeColumnName]),

                    rowsBatch.push(row);
                    if (rowsBatch.length === rowsBatchSize) {
                        CsvFileImporter.InsertRows(layerId, rowsBatch, latitudeColumnName, longitudeColumnName);
                        rowsBatch = [];
                    }
                })
                .on("end", () => {
                    this.InsertRows(layerId, rowsBatch, latitudeColumnName, longitudeColumnName);
                    console.log("File import complete!")
                    resolve(newLayer);
                })
                .on("error", (error) => {
                    console.log(error)
                    reject();
                });
        });
    }

    static getColumnNamesAsync(filePath:string): Promise<string[]> {

        return new Promise<string[]>(function (resolve, reject) {

            let fileContent = "";
            let lines: string[] = [];
            let readStream = fs.createReadStream(filePath);

            readStream.on("data", function (dataChunk) {
                fileContent += dataChunk;

                // Unix line endings use '\n' whereas Windows use '\n\r'.
                lines = fileContent.split("\n").map(line => line.replace(/[\r]/g, ""));

                if (lines.length > 0) {
                    readStream.destroy();
                    let columnNames = lines.slice(0, 1)[0].split(",").map(colName => colName.trim());
                    resolve(columnNames);
                }
            });
        });
    }

    public static InsertRows(layerId:string, rows, latitudeColumnName, longitudeColumnName) {
        /* NOTE: Creating the SQL string using concatenation is not ideal
        but Sequelize doesn't support dynamic table names yet. */

        rows.forEach(row => {
            let columnNames = Object.getOwnPropertyNames(row)
                                .map(colName => colName.trim())
                                .filter(propName => propName !== latitudeColumnName && propName !== longitudeColumnName);

            // The location column is a point created from latitude and longitude.
            let sqlInsert = `INSERT INTO Layer_${layerId} (${columnNames.concat(["geography"]).map(colName => `"${colName}"`).join(",")}) `
                            + ` VALUES (${columnNames.map(colName => "?").join(",")},`
                                + ` ST_SetSRID(ST_MakePoint(?, ?), 4326))`;

            let replacements = columnNames.map(colName => row[colName])
                                        .concat([ row[longitudeColumnName], row[latitudeColumnName] ]);

            DAL.sequelize.query(sqlInsert, {
                replacements: replacements,
                type: QueryTypes.INSERT
            });
        });
    }
}
